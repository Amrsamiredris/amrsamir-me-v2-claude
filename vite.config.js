import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        events: resolve(__dirname, 'events/index.html'),
        marketing: resolve(__dirname, 'marketing/index.html'),
        ai: resolve(__dirname, 'ai/index.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
