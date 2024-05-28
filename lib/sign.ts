// import { recoverPersonalSignature } from "@metamask/eth-sig-util";

export const signMessage = async (
  web3: any,
  account: string | null,
  message: string | null
) => {
  if (!web3 || !account || !message) return null;
  const signedMessage = await web3.eth.personal.sign(message, account, "");
  return signedMessage;
};

// export const verifyMessage = async (
//   message: string,
//   signedMessage: any,
//   account: string | null
// ) => {
//   if (!account) return null;
//   const recoveredAddress = recoverPersonalSignature({
//     data: message,
//     signature: signedMessage,
//   });
//   console.log("recoveredAddress:", recoveredAddress);
//   console.log(
//     recoveredAddress.toLocaleLowerCase() === account.toLocaleLowerCase()
//       ? "Signing success!"
//       : "Signing failed!"
//   );
// };
