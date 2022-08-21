module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stor(y|ies).@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react',
};
