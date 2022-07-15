const preset = require('../../packages/config/eslint-react');
const { merge } = require('merge-anything');

module.exports = merge(preset, {
  ignorePatterns: ['**/generated/*.ts'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
});
