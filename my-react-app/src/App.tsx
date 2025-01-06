// App.tsx
import  { useState } from "react";
import { CapsuleModal } from "@usecapsule/react-sdk";
import "@usecapsule/react-sdk/styles.css";
import { setupViemSafe } from "./utils/ViemSafeSetup";
import { setupCapsule, signTransaction } from "./utils/CapsuleSetup";



function App() {
  const capsuleApiKey = import.meta.env.VITE_REACT_APP_CAPSULE_API_KEY;
  const providerApiKey = import.meta.env.VITE_REACT_APP_CAPSULE_API_KEY;

  // Setup Capsule and Ethers Signer
  const { capsule, ethersSigner } = setupCapsule(capsuleApiKey, providerApiKey);

  // Setup Capsule Viem Client and Safe SDK
  setupViemSafe(capsule).then(async ({ safeSdk, capsuleViemClient }) => {
    // Get Safe address
    const safeAddress = await safeSdk.getAddress();

    // Example: Create and execute a Safe transaction
    const safeTransaction = await safeSdk.createTransaction({
      safeTransactionData: [],
    });
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
    await safeSdk.executeTransaction(safeTransaction, senderSignature);

    // Example: Send a transaction through the Safe account
    const transaction = await capsuleViemClient.sendTransaction({
      account: safeAddress,
      to: "0x...", // Replace with recipient address
      value: 1000000000000000000n, // 1 ETH in wei
    });

    console.log("Transaction hash:", transaction);
  });

  // Example: Sign a transaction
  const transaction = {
    from: "0x...", // Your address
    to: "0x...", // Recipient address
    value: ethers.parseUnits("0.1", "ether"), // Replace with the desired value
  };
  signTransaction(ethersSigner, transaction).then((signedTx) => {
    console.log("Signed transaction:", signedTx);
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Sign in with Capsule</button>
      <CapsuleModal
        capsule={capsule}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appName="Your App Name"
        logo="https://yourapp.com/logo.png"
        theme={{
          backgroundColor: "#ffffff",
          foregroundColor: "#000000",
        }}
        oAuthMethods={["GOOGLE", "TWITTER", "DISCORD"]}
      />
    </div>
  );
}

export default App;
