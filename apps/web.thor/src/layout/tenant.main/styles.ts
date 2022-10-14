import { css, styled } from '@mui/material';

import { LayoutBody } from '@app/layout/base/body';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const Content = styled(LayoutBody)(
  ({ theme }) => css`
    flex-grow: 1;
    padding: ${theme.spacing(1)};
  `,
);
