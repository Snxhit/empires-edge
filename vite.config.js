import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/empires-edge/',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    watch: {
      usePolling: true, // Enable polling to check for file changes
    },
  },
});
