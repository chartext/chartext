import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@chartext/chart',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@chartext/canvaskit', 'tinycolor2'],
      treeshake: 'smallest',
      output: {
        globals: {
          '@chartext/canvaskit': 'canvaskit',
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          tinycolor2: 'tinycolor',
        },
        sourcemap: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
