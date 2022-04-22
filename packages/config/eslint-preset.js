/* eslint-disable */
module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: "*.js",
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
