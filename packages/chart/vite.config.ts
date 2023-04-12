import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@chartext/canvaskit': resolve(__dirname, '../canvaskit/src/index.ts'),
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    cache: {
      dir: '../../.vitest/chartext-chart',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@chartext/chart',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@chartext/canvaskit',
        'tinycolor2',
        'lodash',
      ],
      treeshake: 'smallest',
      output: {
        globals: {
          // lodash: '_',
          '@chartext/canvaskit': 'canvaskit',
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          tinycolor2: 'tinycolor',
        },
        sourcemap: true,
      },
    },
  },
});
