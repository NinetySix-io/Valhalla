/* eslint-disable */
module.exports = {
  root: true,
  extends: ['../../packages/config/eslint-react.js'],
  ignorePatterns: ['**/generated.*.ts'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
