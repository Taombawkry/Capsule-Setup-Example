import { useState } from "react";
import { CapsuleModal } from "@usecapsule/react-sdk";
import "@usecapsule/react-sdk/styles.css";
import { capsule } from "./utils/Capsule-Client-Instance";

function App() {
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
