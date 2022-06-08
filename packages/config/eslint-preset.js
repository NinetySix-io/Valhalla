module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      excludedFiles: '*.js',
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  ignorePatterns: ['**/*.js'],
};
