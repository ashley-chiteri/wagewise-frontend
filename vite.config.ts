import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        entry: 'electron/main.ts', // Entry point for the Electron main process
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'), // Entry point for the preload script
      },
      renderer: process.env.NODE_ENV === 'test' ? undefined : {}, // Renderer process configuration
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add an alias for the src directory
    },
  },
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clear the output directory before building
  },
});
