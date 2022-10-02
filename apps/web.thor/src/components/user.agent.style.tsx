import * as React from 'react';

import { css } from '@mui/material';

export const UserAgentStyleDisabler: React.FC = () => {
  return (
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
  );
};
