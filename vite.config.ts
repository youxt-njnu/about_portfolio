import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),glsl(), cesium()],
  base: '/about_portfolio/',
  assetsInclude: ['**/*.glb','**/*.gltf', '**/*.fbx', '**/*.obj','**/*.mtl'],
  build: {
    chunkSizeWarningLimit: 1500
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
