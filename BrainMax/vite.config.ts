import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  envPrefix: 'VITE_',
  build: {
    sourcemap: true // Enable source maps
  },
});
