module.exports = {
  root: true,
  extends: [
    // 'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.eslint.json', 'packages/*/tsconfig.json', 'examples/*/tsconfig.json'],
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // plugins: ['no-relative-import-paths'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*', '*index*'],
      },
    ],
    /* 'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: false, rootDir: 'packages', prefix: '@' },
    ], */
  },
  overrides: [
    {
      files: [
        'packages/**/__tests__/*',
        'packages/**/*{.,_}{test,spec}.{ts,tsx}',
        'vite.config.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['packages/**/*.tsx', 'packages/**/*.ts'],
      rules: {
        'import/extensions': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      },
    },
  ],
};
