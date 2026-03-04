import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:3001',
        ws: true
      }
    }
  },
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-charts': ['recharts'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,     // ⚡ clean dist/ before each build (prevent stale files)
    sourcemap: false,      // smaller production bundle
    minify: 'esbuild',     // fastest minifier
    target: 'es2020',      // modern browsers only
    cssMinify: true,
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'],
  }
});
