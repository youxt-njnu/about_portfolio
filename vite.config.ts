import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),glsl()],
  base: '/about_portfolio/',
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
