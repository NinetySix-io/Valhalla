import '@storybook/addon-console';

import * as React from 'react';

import { DecoratorFn } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { UserAgentStyleDisabler } from '../src/storybook/decorators/user.agent.style';
import { provideTheme } from '../src/storybook/decorators/theme.provider.decorator';

export const decorators: DecoratorFn[] = [
  provideTheme(),
  UserAgentStyleDisabler,
];

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
  /**
   * @see https://storybook.js.org/addons/storybook-addon-apollo-client
   */
  apolloClient: {
    MockedProvider,
  },
  nextRouter: {
    /**
     * @see https://storybook.js.org/addons/storybook-addon-next-router
     */
    Provider: RouterContext.Provider,
  },
};
