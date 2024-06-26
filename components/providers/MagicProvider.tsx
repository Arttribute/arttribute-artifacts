"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { getChainId, getNetworkUrl } from "@/lib/networks";
const { Web3 } = require("web3");

type MagicContextType = {
  magic: Magic | null;
  web3: typeof Web3 | null;
};

const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
});

export const useMagicContext = (): MagicContextType => {
  const context = useContext(MagicContext);
  if (context === null) {
    throw new Error("useMagicContext must be used within a MagicProvider");
  }
  return context;
};

const MagicProvider = ({ children }: { children: React.ReactNode }) => {
  const [magicInstance, setMagicInstance] = useState<Magic | null>(null);
  const [web3Instance, setWeb3Instance] = useState<typeof Web3 | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
        network: {
          rpcUrl: getNetworkUrl() || "", // Provide a default value for undefined
          chainId: getChainId(),
        },
      });

      setMagicInstance(magic);
      setWeb3Instance(new Web3((magic as any).rpcProvider));
    }
  }, []);

  return (
    <MagicContext.Provider
      value={{
        magic: magicInstance,
        web3: web3Instance,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};

export default MagicProvider;
