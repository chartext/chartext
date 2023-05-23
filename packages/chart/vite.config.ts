import { resolve } from 'path';
import react from '@vitejs/plugin-react';
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
      external: [
        '@chartext/canvaskit',
        'bezier-js',
        'date-fns-tz',
        'date-fns',
        'react-dom',
        'react',
        'react/jsx-runtime',
        'tinycolor2',
      ],
      treeshake: 'smallest',
      output: {
        globals: {
          '@chartext/canvaskit': '@chartext/canvaskit',
          'date-fns-tz': 'date-fns-tz',
          'bezier-js': 'bezier-js',
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
