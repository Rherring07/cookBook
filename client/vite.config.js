import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"],

  server: {
    host: true,
    port : 3000,
    proxy: {
      '/api': {
        target: 'https://cookbook-production-9625.up.railway.app/',
        changeOrigin: true,
        secure: false,
      } 
    }
  },
})
