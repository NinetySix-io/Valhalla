/// @ts-check
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  /**
   * @param {import('webpack').Configuration} config
   */
  webpackFinal: (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      ['@app']: path.resolve(__dirname, '../src'),
    };

    if (!config.resolve.extensions) {
      config.resolve.extensions = [];
    }

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
