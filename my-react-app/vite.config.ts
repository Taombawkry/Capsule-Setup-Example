import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  nodePolyfills({include: ["buffer", "crypto", "stream", "util"]})],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      buffer: "buffer",
      stream: "stream-browserify",
    },
  },
})


