import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/chartext',
  build: {
    sourcemap: true,
    rollupOptions: {
      treeshake: {
        preset: 'smallest',
        moduleSideEffects: true,
      },
      output: {
        manualChunks: {
          'mantine-core': ['@mantine/core'],
        },
      },
    },
  },
});
