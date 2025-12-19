import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Esta linea se debe dejar sin nada porque puede dar problemas de compilacion sobretodo con los custom hooks
    react(),
    tailwindcss(),
    ["prettier-plugin-tailwindcss"],
  ],
})