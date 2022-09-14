import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    /**
     * @see https://storybook.js.org/addons/storybook-addon-next-router
     */
    Provider: RouterContext.Provider,
  },
};
