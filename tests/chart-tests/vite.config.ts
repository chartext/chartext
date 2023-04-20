import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    cache: {
      dir: './.vitest',
    },
  },
});
