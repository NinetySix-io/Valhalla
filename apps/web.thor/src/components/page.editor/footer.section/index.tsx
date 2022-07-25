import * as React from 'react';

import { css, styled } from '@mui/material';

const Container = styled('div')(
  () => css`
    width: 100%;

    :hover {
      cursor: pointer;
    }
  `,
);

const Content = styled('div')(
  ({ theme }) => css`
    margin: auto;
    padding: ${theme.spacing(3)} ${theme.spacing(1)};
  `,
);

export const FooterSection: React.FC = () => {
  return (
    <Container>
      <Content>Footer</Content>
    </Container>
  );
};
