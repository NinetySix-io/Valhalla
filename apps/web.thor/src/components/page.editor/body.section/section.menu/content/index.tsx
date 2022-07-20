import * as React from 'react';

import { css, styled } from '@mui/material';

const Container = styled('div')(
  ({ theme }) => css`
    padding: ${theme.spacing(3)};
    width: 350px;
  `,
);

export const SectionMenuContent: React.FC = () => {
  return <Container>content</Container>;
};
