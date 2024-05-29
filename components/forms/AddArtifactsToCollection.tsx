"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { fetchMessage } from "@/lib/fetchers";
import { signMessage } from "@/lib/sign";
import { useMagicContext } from "../providers/MagicProvider";
import { useAuth } from "../providers/AuthProvider";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import LoadingButton from "../LoadingButton";
import { useState } from "react";

const FormSchema = z.object({
  artifacts: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const AddArtifactsToCollection = ({
  collectionId,
  artifacts,
}: {
  collectionId: string;
  artifacts: Artifact[];
}) => {
  const router = useRouter();
  const { web3 } = useMagicContext();
  const { account } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      artifacts: [],
    },
  });

  const onSubmit = async ({ artifacts }: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const message: string | null = await fetchMessage(account);
    const signedMessage: string | null = await signMessage(
      web3,
      account,
      message
    );

    const res = await fetch(`/api/collections/${collectionId}/items`, {
      method: "POST",
      body: JSON.stringify({
        items: artifacts,
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
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
      setIsLoading(false);
      return;
    }
    const { data } = await res.json();
    console.log(data);
    toast({
      title: "Success!",
      description: "Artifacts added to collection!",
    });
    setIsLoading(false);
    router.replace(`/collections/${collectionId}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="artifacts"
          render={() => (
            <FormItem className="w-full">
              <div className="mb-4">
                <FormLabel className="text-base">Add</FormLabel>
                <FormDescription>
                  Select the artifacts you want to add to this collection.
                </FormDescription>
              </div>
              <ScrollArea className="w-96 h-auto border rounded-md p-4">
                <div className="flex flex-wrap gap-2 w-full">
                  {artifacts.map((artifact) => (
                    <FormField
                      key={artifact.id}
                      control={form.control}
                      name="artifacts"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={artifact.id}
                            className="relative w-[23%]"
                          >
                            <FormControl className="absolute top-0 -right-1">
                              <Checkbox
                                className="bg-white rounded-lg shadow-sm"
                                checked={field.value?.includes(artifact.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        artifact.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== artifact.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <Image
                              src={artifact.imageUrl}
                              alt="image of artifact"
                              width={400}
                              height={400}
                              className="object-cover rounded-lg aspect-square"
                            />
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" isLoading={isLoading}>
          Add Artifacts To Collection
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AddArtifactsToCollection;
