// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';


export default defineConfig({
  build: {
    outDir: 'dist', // Ensure the build output is in the "dist" directory
  },
  base:"/",
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // This sets up the alias
    },
  },
});