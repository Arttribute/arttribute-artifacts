import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  formatEther,
  getContract,
  http,
  parseUnits,
} from "viem";
import { celo, celoAlfajores, mainnet } from "viem/chains";
import { stableTokenABI } from "@celo/abis";

const MAINNET_STABLE_TOKEN_ADDRESS =
  "0x765DE816845861e75A25fCA122bb6898B8B1282a";
const TESTNET_STABLE_TOKEN_ADDRESS =
  "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

export const createMinipayClient = () => {
  const client = createWalletClient({
    chain: mainnet,
    transport: custom((window as any).ethereum!),
  });

  return client;
};

const publicClient = createPublicClient({
  chain: celo,
  transport: http(),
}); // Mainnet

export const checkCUSDBalance = async (address: string) => {
  let StableTokenContract = getContract({
    abi: stableTokenABI,
    address: MAINNET_STABLE_TOKEN_ADDRESS,
    client: publicClient,
  });

  let balanceInBigNumber = await StableTokenContract.read.balanceOf([
    address as `0x${string}`,
  ]);

  let balanceInWei = balanceInBigNumber;

  let balanceInEthers = formatEther(balanceInWei);

  return balanceInEthers;
};

export const signMinipayMessage = async (message: string | null) => {
  if (!message) return null;

  const walletClient = createMinipayClient();
  const [account] = await walletClient.getAddresses();

  const signature = await walletClient.signMessage({
    account,
    message,
  });

  return signature;
};

export const estimateGas = async (transaction: TransactionBody) => {
  return await publicClient.estimateGas({ ...transaction });
};

export const requestTransfer = async (
  transactionBody: TransactionBody,
  isTestnet = true
) => {
  const client = createWalletClient({
    chain: isTestnet ? celoAlfajores : celo,
    transport: custom((window as any).ethereum!),
  });

  // const FETCH_CUSD_ABI_URL = `https://explorer.celo.org/${
  //   isTestnet ? "alfajores" : "mainnet"
  // }/api?module=contract&action=getabi&address=${
  //   isTestnet ? TESTNET_STABLE_TOKEN_ADDRESS : MAINNET_STABLE_TOKEN_ADDRESS
  // }`;

  // const stableContractAbi = await fetch(FETCH_CUSD_ABI_URL)
  //   .then((res) => res.json())
  //   .then((res) => JSON.parse(res.result));

  let hash = await client.sendTransaction({
    account: transactionBody.account,
    to: transactionBody.to,
    // to: '0x765DE816845861e75A25fCA122bb6898B8B1282a' // cUSD (Mainnet)
    // to: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1' // cUSD (Testnet)
    // to: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' // USDC (Mainnet)
    // to: '0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e' // USDT (Mainnet)
    value: transactionBody.value,
    data: encodeFunctionData({
      abi: stableTokenABI,
      functionName: "transfer",
      args: [
        transactionBody.to,
        // Different tokens can have different decimals, cUSD (18), USDC (6)
        parseUnits(`${Number(transactionBody.value)}`, 18),
      ],
    }),
    // If the wallet is connected to a different network then you get an error.
    chain: celoAlfajores,
    // chain: celo,
  });

  const transaction = await publicClient.waitForTransactionReceipt({
    hash, // Transaction hash that can be used to search transaction on the explorer.
  });

  if (transaction.status === "success") {
    // Do something after transaction is successful.
    return transaction;
  } else {
    // Do something after transaction has failed.
    return null;
  }
};
