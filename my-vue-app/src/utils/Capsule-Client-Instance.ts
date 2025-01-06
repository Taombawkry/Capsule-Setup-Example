import Capsule, { Environment } from "@usecapsule/react-sdk";

const capsuleApiKey = import.meta.env.VITE_REACT_APP_CAPSULE_API_KEY;

const capsule = new Capsule(Environment.BETA,capsuleApiKey);

// Verify the instance is created successfully
console.log("Capsule instance created:", capsule);