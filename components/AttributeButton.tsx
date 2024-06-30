"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useAuth } from "./providers/AuthProvider";
import { useMagicContext } from "./providers/MagicProvider";
import { fetchMessage } from "@/lib/fetchers";
import { signMessage } from "@/lib/sign";
import { useToast } from "./ui/use-toast";
import { useMinipay } from "./providers/MinipayProvider";
import { parseEther } from "viem";
import { requestTransfer, signMinipayMessage } from "@/lib/minipay";
import Tester from "./Tester";

const formSchema = z.object({
  amount: z.number(),
  donateFlag: z.boolean(),
  // TODO: maybe add more currency options
});

const AttributeButton = ({
  purpose,
  id,
  creatorAddress,
}: {
  purpose: "collections" | "artifacts";
  id: string;
  creatorAddress?: string;
}) => {
  const { account } = useAuth();
  const { web3 } = useMagicContext();
  const { minipay } = useMinipay();
  const { toast } = useToast();

  const web3Address = minipay ? minipay.address : account;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      donateFlag: false,
    },
  });

  const makeAttribution = async (id: string) => {
    const message: string | null = await fetchMessage(web3Address);
    const signedMessage: string | null = Boolean(minipay)
      ? await signMinipayMessage(message)
      : await signMessage(web3, web3Address, message);

    const res = await fetch(`/api/${purpose}/${id}/attributions`, {
      method: "POST",
      body: JSON.stringify({
        authHeaders: {
          address: web3Address,
          message,
          signature: signedMessage,
        } as AuthHeaders,
      }),
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const { message } = await res.json();
        throw new Error(message);
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    }

    return res.json();
  };

  const makePayment = async (amount: number) => {
    if (!amount) throw new Error("Amount is required");
    if (amount < 0) throw new Error("Amount must be positive");

    // TODO: support other payment maybe with magic.link
    if (!minipay) throw new Error("Minipay not found");
    if (!minipay.address) throw new Error("Minipay address not found");
    if (!creatorAddress) throw new Error("Creator address not found");
    if (minipay.address === creatorAddress) {
      throw new Error("You can't donate to yourself");
    }

    const transactionBody = {
      account: minipay.address,
      to: creatorAddress!,
      value: parseEther(`${amount}`),
    } as TransactionBody;

    const transactionRes = await requestTransfer(transactionBody);

    setTesterContent(transactionRes);
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
      toast({
        title: "Success!",
        description: "Attribution created!",
      });
    } catch (error: any) {
      console.error(error);
      setTesterContent(error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error.toString(),
      });
    } finally {
      setIsLoadingAttribution(false);
      setIsLoadingDonation(false);
    }
  };

  const [amount, setAmount] = useState(form.getValues("amount"));
  const [isLoadingDonation, setIsLoadingDonation] = useState(false);
  const [isLoadingAttribution, setIsLoadingAttribution] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testerContent, setTesterContent] = useState<any>(null);

  return (
    <>
      <Tester content={testerContent} />
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
                  <span className="font-bold">
                    {(amount * 0.8).toFixed(2)} $
                  </span>
                </p>
                <p>
                  Arttribute takes 20% to keep the lights on and support
                  creators
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                {creatorAddress && (
                  <DialogClose asChild>
                    <LoadingButton
                      type="submit"
                      className="w-full"
                      isLoading={isLoading || isLoadingDonation}
                      onClick={() => form.setValue("donateFlag", true)}
                    >
                      Show your support and make attribution
                    </LoadingButton>
                  </DialogClose>
                )}

                <DialogClose asChild>
                  <LoadingButton
                    variant="ghost"
                    type="submit"
                    className="w-full space-x-1"
                    isLoading={isLoading || isLoadingAttribution}
                    onClick={() => form.setValue("donateFlag", false)}
                  >
                    <span>Skip and make attribution</span>
                    <SquareArrowOutUpRight className="h-4 w-4" />
                  </LoadingButton>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttributeButton;
