import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for proper Docker networking
  },
  build: {
    outDir: 'dist',
  },
})
