import Capsule, { Environment } from "@usecapsule/react-sdk";

const capsuleApiKey = import.meta.env.VITE_REACT_APP_CAPSULE_API_KEY;

export const capsule = new Capsule(Environment.BETA,capsuleApiKey);

console.log("Capsule instance created:", capsule);