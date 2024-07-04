import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ABOUT_PORTFOLIO/',
  assetsInclude: ['**/*.glb'],
  build: {
    chunkSizeWarningLimit: 1500
  },
})
