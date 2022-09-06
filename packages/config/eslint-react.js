module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  overrides: [
    // {
    //   files: ['*.ts', '*.tsx'],
    //   excludedFiles: '*.js',
    // },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-no-inline-styles'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-inline-styles/no-inline-styles': 'error',
    'react/display-name': ['off']
  },
};
