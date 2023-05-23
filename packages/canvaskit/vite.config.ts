import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
//import typescript from '@rollup/plugin-typescript';
//import dts from 'rollup-plugin-dts';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    /* typescript({
      outDir: resolve(__dirname, 'dist/types'),
      rootDir: resolve(__dirname, 'src'),
      emitDeclarationOnly: true,
      declaration: true,
      // declarationDir: 'dist/types',
    }), */
    /* dts({
      tsconfig: 'tsconfig.dist.json',
    }), */
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@chartext/canvaskit',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'canvaskit-wasm',
        'tinycolor2',
      ],
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
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
