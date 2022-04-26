import * as React from 'react';

import { Box, Container, styled } from '@mui/material';

import { Footer } from './footer';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vw;
`;

const Body = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper fixed maxWidth="xl">
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  );
};
