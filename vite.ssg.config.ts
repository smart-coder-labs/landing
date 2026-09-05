/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Build-only config for the prerender pass. It exists separately from the app
 * config so the production build stays exactly as the project defines it.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-ssg.tsx',
    outDir: 'dist-ssg',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'esm', entryFileNames: 'entry-ssg.mjs' } },
  },
});
