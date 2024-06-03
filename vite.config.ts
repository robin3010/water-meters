import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths()],
  server: {
    proxy: {
      '/baseUrl': {
        target: 'http://showroom.eis24.me/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/baseUrl/, ''),
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
