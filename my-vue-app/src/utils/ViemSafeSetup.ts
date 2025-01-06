import { createCapsuleViemClient } from '@usecapsule/viem-v2-integration';
import { http, createPublicClient } from 'viem';
import { sepolia } from 'viem/chains';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeAccountConfig } from '@safe-global/safe-core-sdk-types';

/**
 * Sets up the Capsule Viem client and integrates with Safe SDK.
 * @param capsule - The Capsule instance
 * @returns An object containing the Safe SDK instance and Capsule Viem client
 */
export const setupViemSafe = async (capsule: any) => {
  // Create the Capsule Viem client
  const capsuleViemClient = createCapsuleViemClient(capsule, {
    chain;;;;;;;;;;;;;;, // Replace with your desired chain
    transport: http("https://ethereum.rpc.subquery.network/public"), // Replace with your RPC URL
  });

  // Configure Safe account
  const safeAccountConfig: SafeAccountConfig = {
    owners: [await capsuleViemClient.account.address],
    threshold: 1,
  };

  // Set up Ethers adapter
  const ethAdapter = new EthersAdapter({
    ethers: capsuleViemClient,
    signerOrProvider: capsuleViemClient.account,
  });

  // Initialize Safe SDK
  const safeSdk = await Safe.create({ ethAdapter, safeAccountConfig });

  return { safeSdk, capsuleViemClient };
};
