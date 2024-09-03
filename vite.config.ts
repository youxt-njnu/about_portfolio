import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),glsl()],
  base: './',
  assetsInclude: ['**/*.glb','**/*.gltf'],
  build: {
    chunkSizeWarningLimit: 1500
  },
})
