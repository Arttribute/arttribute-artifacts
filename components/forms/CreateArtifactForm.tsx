"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectLicenseFormItem from "./SelectLicenseFormItem";
import { fileToBase64 } from "@/lib/utils";
import { useMagicContext } from "../providers/MagicProvider";
import { useAuth } from "../providers/AuthProvider";
import { signMessage } from "@/lib/sign";
import { fetchMessage } from "@/lib/fetchers";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  file: z
    .any()
    .refine((files: FileList) => files?.length > 0, "Please select an image.")
    .refine((files: FileList) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files: FileList) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  license: z.enum(
    ["open", "exclusive", "non_commercial", "exclusive_non_commercial"],
    { required_error: "Please select an option." }
  ),
});

const CreateArtifactForm = () => {
  const { web3 } = useMagicContext();
  const { account } = useAuth();

  // TODO: use state for displaying preview

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.file) return;

    const message: string | null = await fetchMessage(account);
    const signedMessage: string | null = await signMessage(
      web3,
      account,
      message
    );

    const fileAsBase64 = await fileToBase64(values.file[0]);

    const res = await fetch("/api/artifacts", {
      method: "POST",
      body: JSON.stringify({
        fileAsBase64,
        license: values.license,
        authHeaders: {
          address: account,
          message,
          signature: signedMessage,
        } as AuthHeaders,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.error(message);
      return;
    }

    const { data } = await res.json();
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onBlur={field.onBlur}
                  name={field.name}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>This is the artifact image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <SelectLicenseFormItem
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateArtifactForm;
