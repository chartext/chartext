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
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    project: [
      'tsconfig.eslint.json',
      'examples/*/tsconfig.json',
      'packages/*/tsconfig.json',
      'tests/*/tsconfig.json',
    ],
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
    'import/no-default-export': ['error'],
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
    // Fixes error when importing dev dependencies
    {
      files: ['tests/**/*.ts', 'vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['tests/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [
        'examples/**/*.tsx',
        'examples/**/*.ts',
        'packages/**/*.tsx',
        'packages/**/*.ts',
        'tests/**/*.tsx',
        'tests/**/*.ts',
      ],
      rules: {
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      },
    },
  ],
};
