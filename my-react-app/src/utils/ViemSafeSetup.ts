import { createCapsuleViemClient } from '@usecapsule/viem-v2-integration';
import { http } from 'viem';
import { sepolia } from 'viem/chains';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';

/**
 * Sets up the Capsule Viem client and integrates with Safe SDK.
 * @param capsule - The Capsule instance
 * @returns An object containing the Safe SDK instance and Capsule Viem client
 */
export const setupViemSafe = async (capsule: any) => {
  const ethRpcUrl = import.meta.env.VITE_REACT_APP_ETH_RPC_URL;`
  `
  // Create the Capsule Viem client
  const capsuleViemClient:any = createCapsuleViemClient(capsule, {
    chain: sepolia,
    transport: http(ethRpcUrl), 
  });

  // Set up Ethers adapter
  const ethAdapter = new EthersAdapter({
    ethers: capsuleViemClient,
    signerOrProvider: capsuleViemClient.account,
  });

  // configure & deploy safe account
  const safeSdk = await Safe.create({
    ethAdapter,
    safeAddress: undefined,
    predictedSafe: {
      safeAccountConfig: {
        owners: [await capsuleViemClient.account.address],
        threshold: 1
      }
    }
  });
  
const safeAddress = await safeSdk.getAddress();
const safeTransaction = await safeSdk.createTransaction({
  safeTransactionData: []
});

// get the transaction hash and sign it
const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
const senderSignature = await safeSdk.signTransactionHash(safeTxHash);

// add the signature to the transaction 
safeTransaction.addSignature(senderSignature);

await safeSdk.executeTransaction(safeTransaction, {
  gasLimit: 250000,
  maxFeePerGas: '50000000000', 
  maxPriorityFeePerGas: '1500000000' 
});

// Example: Send a transaction through the Safe smart account
const transaction = await capsuleViemClient.sendTransaction({
  account: safeAddress,
  to: '0x...',  // Recipient address
  value: 1000000000000000000n,  // 1 ETH in wei
});

console.log('Transaction hash:', transaction);

};
