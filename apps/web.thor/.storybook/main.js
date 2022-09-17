const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-next-router',
    'storybook-addon-apollo-client',
    'storybook-dark-mode',
    'storybook-mobile',
    'storybook-addon-performance/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  features: {
    interactionsDebugger: true,
  },
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
