import { defineConfig } from 'vite'

export default defineConfig({
  // Minimal config for Lovable compatibility
  build: {
    outDir: 'dist'
  },
  server: {
    port: 8080,
    open: '/index.php'
  }
})