"use client";
import { checkCUSDBalance, createMinipayClient } from "@/lib/minipay";
import { createContext, useContext, useEffect, useState } from "react";

type MinipayProps = {
  address: string;
  balance: string;
};

type MinipayContextType = {
  minipay: MinipayProps | null;
  setMinipay: (minipay: React.SetStateAction<MinipayProps | null>) => void;
};

const MinipayContext = createContext<MinipayContextType | null>(null);

const MinipayProvider = ({ children }: { children: React.ReactNode }) => {
  const [minipay, setMinipay] = useState<MinipayProps | null>(null);

  useEffect(() => {
    const checkMinipay = async () => {
      const walletClient = createMinipayClient();
      const [address] = await walletClient.getAddresses();

      const ethereum = (window as any)?.ethereum;

      if (ethereum) {
        // User has a injected wallet
        if (ethereum.isMiniPay) {
          // User is using Minipay
          const balance = await checkCUSDBalance(address);

          setMinipay((prev) => ({
            ...prev,
            address: address.toLowerCase(),
            balance,
          }));
        } else {
          // User is not using MiniPay
          setMinipay(null);
        }
      }
    };
    checkMinipay();
  }, [minipay]);

  return (
    <MinipayContext.Provider value={{ minipay, setMinipay }}>
      {children}
    </MinipayContext.Provider>
  );
};

export const useMinipay = (): MinipayContextType => {
  const context = useContext(MinipayContext);
  if (context === null) {
    throw new Error("useMinipay must be used within a MinipayProvider");
  }
  return context;
};

export default MinipayProvider;
