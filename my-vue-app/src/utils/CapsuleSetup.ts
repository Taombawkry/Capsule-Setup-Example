// CapsuleSetup.ts
import Capsule, { Environment } from "@usecapsule/react-sdk";
import { CapsuleEthersSigner } from "@usecapsule/ethers-v6-integration";
import { ethers, TransactionRequest } from "ethers";

/**
 * Initializes the Capsule instance and creates a Capsule Ethers Signer.
 * @param capsuleApiKey - The API key for Capsule
 * @param providerApiKey - The API key for the provider
 * @returns An object containing the Capsule instance and Ethers signer
 */
export const setupCapsule = (capsuleApiKey: string, providerApiKey: string) => {
  // Initialize the Capsule instance
  const capsule = new Capsule(Environment.BETA, capsuleApiKey);
  console.log("Capsule instance created:", capsule);

  // Set up the provider
  const provider = new ethers.JsonRpcProvider(providerApiKey);

  // Create the Capsule Ethers Signer
  const ethersSigner = new CapsuleEthersSigner(capsule, provider);

  return { capsule, ethersSigner };
};

/**
 * Signs a transaction using the Capsule Ethers Signer.
 * @param ethersSigner - The Capsule Ethers Signer
 * @param transaction - The transaction to sign
 * @returns A promise resolving to the signed transaction
 */
export const signTransaction = async (
  ethersSigner: CapsuleEthersSigner,
  transaction: TransactionRequest
) => {
  return await ethersSigner.signTransaction(transaction);
};
