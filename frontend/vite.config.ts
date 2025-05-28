import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // “@” → frontend/src
    },
  },
  plugins: [
    svgr({
      svgrOptions: {
        svgoConfig: { floatPrecision: 2 },
      },
    }),

    react(),

    tailwind(),
  ],
});
