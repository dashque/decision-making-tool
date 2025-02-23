import { defineConfig } from 'vite';

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
});
