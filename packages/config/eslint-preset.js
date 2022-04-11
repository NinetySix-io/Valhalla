module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: "*.js",
    },
  ],
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
};
