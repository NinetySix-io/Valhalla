const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-apollo-client',
    'storybook-dark-mode',
    'storybook-mobile',
    'storybook-addon-performance/register',
    'storybook-addon-material-ui',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
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
