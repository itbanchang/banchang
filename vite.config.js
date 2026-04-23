import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            if (err.code !== 'ECONNREFUSED') {
              console.log(`[vite proxy error] ${err.message}`);
            }
          });
        }
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            if (err.code !== 'ECONNREFUSED') {
              console.log(`[vite ws proxy error] ${err.message}`);
            }
          });
        }
      }
    }
  },
  build: {
    // Code splitting for better caching & parallel loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3') || id.includes('node_modules/lodash')) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/socket.io-client') || id.includes('node_modules/@socket.io') || id.includes('node_modules/engine.io')) {
            return 'vendor-socket';
          }
          // Separate heavy shared components for caching
          if (id.includes('src/components/shared/')) {
            return 'shared-ui';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,     // clean dist/ before each build (prevent stale files)
    sourcemap: false,      // smaller production bundle
    minify: 'esbuild',     // fastest minifier
    target: 'es2020',      // modern browsers only
    cssMinify: true,
    // Inline small assets to reduce HTTP requests
    assetsInlineLimit: 8192,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    // Faster JSX transform
    jsx: 'automatic',
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'socket.io-client'],
  }
});
