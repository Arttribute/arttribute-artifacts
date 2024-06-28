import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  getContract,
  http,
} from "viem";
import { celo, mainnet } from "viem/chains";
import { stableTokenABI } from "@celo/abis";

const publicClient = createPublicClient({
  chain: celo,
  transport: http(),
}); // Mainnet

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export const createMinipayClient = async () => {
  const client = createWalletClient({
    chain: mainnet,
    transport: custom((window as any).ethereum!),
  });

  const [address] = await client.getAddresses();

  return address;
};

export const checkCUSDBalance = async (address: string) => {
  let StableTokenContract = getContract({
    abi: stableTokenABI,
    address: STABLE_TOKEN_ADDRESS,
    client: publicClient,
  });

  let balanceInBigNumber = await StableTokenContract.read.balanceOf([
    address as `0x${string}`,
  ]);

  let balanceInWei = balanceInBigNumber;

  let balanceInEthers = formatEther(balanceInWei);

  return balanceInEthers;
};
