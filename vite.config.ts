import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Deploy at root for Firebase Hosting
  plugins: [react(), tailwindcss()],
  
  build: {
    // Minify code in production (esbuild is default and faster)
    minify: 'esbuild',
    sourcemap: false, // No source maps in production
  },
  
  esbuild: {
    // Remove console logs in production build
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Security headers for dev server
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
    // Proxy API requests to Firebase Function (bypasses CORS in dev)
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})