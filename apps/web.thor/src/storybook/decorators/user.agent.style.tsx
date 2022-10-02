import * as React from 'react';

import type { DecoratorFn } from '@storybook/react';
import { UserAgentStyleDisabler as Style } from '@app/components/user.agent.style';

export const UserAgentStyleDisabler: DecoratorFn = (Story) => {
  return (
    <React.Fragment>
      <Style />
      <Story />
    </React.Fragment>
  );
};
