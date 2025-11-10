import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  // This is crucial for SPA routing
  base: './',
  // Enable SPA fallback
  server: {
    historyApiFallback: true
  }
})