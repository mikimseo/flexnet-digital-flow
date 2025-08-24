import { defineConfig } from 'vite'

export default defineConfig({
  // Minimal config for Lovable compatibility
  build: {
    outDir: 'dist'
  },
  server: {
    open: '/index.php'
  }
})