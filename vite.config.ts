import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),glsl()],
  base: './',
  assetsInclude: ['**/*.glb','**/*.gltf', '**/*.obj','**/*.mtl'],
  build: {
    chunkSizeWarningLimit: 1500
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
