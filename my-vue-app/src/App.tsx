import { useState } from "react";
import { CapsuleModal } from "@usecapsule/react-sdk";
import Capsule, { Environment } from "@usecapsule/react-sdk";
import { CapsuleEthersSigner } from "@usecapsule/ethers-v6-integration";
import { ethers } from "ethers";
import { TransactionRequest } from "ethers";

import "@usecapsule/react-sdk/styles.css";

function App() {

  const capsuleApiKey = import.meta.env.VITE_REACT_APP_CAPSULE_API_KEY;

 const capsule = new Capsule(Environment.BETA,capsuleApiKey);

// Set up the provider
const provider = new ethers.JsonRpcProvider(YOUR_RPC_URL);

// Create the Capsule Ethers Signer
const ethersSigner = new CapsuleEthersSigner(capsule, provider);

console.log("Capsule instance created:", capsule);
  // Construct the transaction
const transaction: TransactionRequest = {
  from: "0x...", // Your address
  to: "0x...", // Recipient address
  value: ethers.parseUnits("0.1", "ether"),
  // Configure other transaction parameters as needed
};
// Call the signTransaction method to sign the transaction
const signedTx = async ()=>{
  return await ethersSigner.signTransaction(transaction);
} 
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
