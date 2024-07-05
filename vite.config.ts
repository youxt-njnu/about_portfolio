import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './about_portfolio/',
  assetsInclude: ['**/*.glb'],
  build: {
    chunkSizeWarningLimit: 1500
  },
})
