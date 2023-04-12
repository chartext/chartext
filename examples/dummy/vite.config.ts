import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@chartext/canvaskit': fileURLToPath(
        new URL('../../packages/canvaskit/src/', import.meta.url),
      ),
      '@chartext/chart': fileURLToPath(new URL('../../packages/chart/src/', import.meta.url)),
      // '@': resolve(__dirname, 'src'),
    },
  },
});
