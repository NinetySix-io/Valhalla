import * as React from 'react';

import { Box, Container, styled } from '@mui/material';

import { Footer } from './footer';
import { Header } from './header';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

const Body = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Body maxWidth="xl">{children}</Body>
      <Footer />
    </Wrapper>
  );
};
