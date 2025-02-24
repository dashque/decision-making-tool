import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  build: {
    minify: false,
    sourcemap: true,
    target: 'esnext',
    compact: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [tailwindcss()],
});
