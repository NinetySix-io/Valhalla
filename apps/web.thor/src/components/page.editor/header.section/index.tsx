import * as React from 'react';

import { css, styled } from '@mui/material';

const Container = styled('div')(
  ({ theme }) => css`
    width: 100%;

    :hover {
      cursor: pointer;
      outline: solid 2px ${theme.palette.primary.light};
    }
  `,
);

const Content = styled('div')(
  ({ theme }) => css`
    max-width: 1200px;
    margin: auto;
    padding: ${theme.spacing(3)} ${theme.spacing(1)};
  `,
);

export const HeaderSection: React.FC = () => {
  return (
    <Container>
      <Content>Header</Content>
    </Container>
  );
};
