import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@chartext/canvaskit',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'canvaskit-wasm', 'tinycolor2'],
      treeshake: 'smallest',
      output: {
        globals: {
          'canvaskit-wasm': 'CanvasKitInit',
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          tinycolor2: 'tinycolor',
        },
        sourcemap: true,
      },
    },
  },
});
