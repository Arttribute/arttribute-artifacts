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
import { collections } from "@/lib/dummy";
import SelectLicenseFormItem from "./SelectLicenseFormItem";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  collectionName: z.string().min(3).max(50),
  license: z.enum(
    ["open", "exclusive", "non_commercial", "exclusive_non_commercial"],
    { required_error: "Please select an option." }
  ),
});

const CreateArtifactForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    router.push("/collections/create/1"); //TODO: use actual ID
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="Collection" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of your collection.
              </FormDescription>
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
