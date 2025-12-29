/// <reference types="vitest" />
import { createReactConfig } from '@smart-coder-labs/vite-config/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, mergeConfig } from 'vite';

const baseConfig = createReactConfig({
  port: 5173,
  excludeDeps: ['lucide-react'],
  plugins: [tailwindcss()]
});

export default mergeConfig(baseConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
}));
