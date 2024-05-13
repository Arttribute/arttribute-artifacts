"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquareArrowOutUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

const formSchema = z.object({
  amount: z.number(),
  donateFlag: z.boolean(),
  // TODO: maybe add more currency options
});

const AttributeButton = ({
  purpose,
  id,
}: {
  purpose: "collections" | "artifacts";
  id: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      donateFlag: false,
    },
  });

  const makeAttribution = async (id: string) => {
    const res = await fetch(`/api/${purpose}/${id}/attributions`, {
      method: "POST",
      body: JSON.stringify({ web3Address: "0x1234" }), // TODO: replace with logged in credentials
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const makePayment = async (amount: number) => {
    if (!amount) throw new Error("Amount is required");
    if (amount < 0) throw new Error("Amount must be positive");

    console.log(`Made payment of ${amount} $`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.donateFlag) {
        setIsLoadingDonation(true);
        await makePayment(values.amount);
      } else {
        setIsLoadingAttribution(true);
      }
      const data = await makeAttribution(id);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAttribution(false);
      setIsLoadingDonation(false);
    }
    console.log(values);
  };

  const [amount, setAmount] = useState(form.getValues("amount"));
  const [isLoadingDonation, setIsLoadingDonation] = useState(false);
  const [isLoadingAttribution, setIsLoadingAttribution] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Make Attribution</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-center">Show Your Support</DialogTitle>
          <DialogDescription className="text-center">
            Give a direct nod of support to the creator.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount you wish to send</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.valueAsNumber || 0);
                        setAmount(e.target.valueAsNumber || 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-xs">
              <p>
                Creator receives{" "}
                <span className="font-bold">{(amount * 0.8).toFixed(2)} $</span>
              </p>
              <p>
                Arttribute takes 20% to keep the lights on and support creators
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={isLoadingDonation}
                onClick={() => form.setValue("donateFlag", true)}
              >
                Show your support and make attribution
              </LoadingButton>
              <LoadingButton
                variant="ghost"
                type="submit"
                className="w-full space-x-1"
                isLoading={isLoadingAttribution}
                onClick={() => form.setValue("donateFlag", false)}
              >
                <span>Skip and make attribution</span>
                <SquareArrowOutUpRight className="h-4 w-4" />
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AttributeButton;
