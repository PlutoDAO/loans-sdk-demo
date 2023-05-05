/// <reference types="vitest" />
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/loans-sdk-demo/',
  test: {
    globals: true,
  },
  plugins: [svelte()],
  resolve: {},
  optimizeDeps: {
    exclude: ['svelte-navigator'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    // rollupOptions: {
    //   plugins: [
    //     // Enable rollup polyfills plugin
    //     // used during production bundling
    //     rollupNodePolyFill(),
    //   ],
    // },
  },
});
