import * as React from 'react';

import type { DecoratorFn } from '@storybook/react';
import { css } from '@mui/material';

export const UserAgentStyleDisabler: DecoratorFn = (Story) => {
  return (
    <React.Fragment>
      <style>
        {
          css`
            p {
              margin-block-start: 0;
              margin-block-end: 0;
            }

            *:focus-visible {
              outline: none;
            }
          `.styles
        }
      </style>
      <Story />
    </React.Fragment>
  );
};
