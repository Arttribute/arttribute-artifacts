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
import { useToast } from "../ui/use-toast";
import LoadingButton from "../LoadingButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMinipay } from "../providers/MinipayProvider";
import { signMinipayMessage } from "@/lib/minipay";
import Image from "next/image";
import { XIcon, ImageIcon } from "lucide-react";

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
  const { minipay } = useMinipay();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const web3Address = minipay ? minipay.address : account;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (!values.file) throw new Error("Please select an image.");
      if (values.file[0].size > MAX_FILE_SIZE)
        throw new Error(`Max image size is 5MB.`);

      if (!ACCEPTED_IMAGE_MIME_TYPES.includes(values.file[0].type))
        throw new Error(
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        );

      const message: string | null = await fetchMessage(web3Address);
      const signedMessage: string | null = Boolean(minipay)
        ? await signMinipayMessage(message)
        : await signMessage(web3, web3Address, message);

      const fileAsBase64 = await fileToBase64(values.file[0]);

      const res = await fetch("/api/artifacts", {
        method: "POST",
        body: JSON.stringify({
          fileAsBase64,
          license: values.license,
          authHeaders: {
            address: web3Address,
            message,
            signature: signedMessage,
          } as AuthHeaders,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const { data } = await res.json();
      console.log(data);
      toast({
        title: "Success!",
        description: "Artifact created!",
      });
      router.replace(`/artifacts/${data.id}`);
    } catch (error: any) {
      const msg = error.toString();
      console.error(msg);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <div className="items-center">
                {field.value ? (
                  <div className="relative w-full h-[350px] lg:w-72 lg:h-72  rounded-lg border-2">
                    <Image
                      src={URL.createObjectURL(field.value[0])}
                      alt="Artifact preview"
                      fill={true}
                      className="object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full"
                      onClick={() => {
                        form.reset({ file: undefined });
                      }}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="file">
                    <div className="relative bg-gray-50 flex items-center justify-center w-full h-[350px] lg:w-72 lg:h-72 rounded-lg border-2">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  </label>
                )}
                <FormControl className="mt-1.5 w-full lg:w-72">
                  <Input
                    type="file"
                    id="file"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <div className="w-full lg:w-72">
              <SelectLicenseFormItem
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
            </div>
          )}
        />
        <LoadingButton
          type="submit"
          className="w-full lg:w-72"
          isLoading={isLoading}
        >
          Create Artifact
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateArtifactForm;
