import * as React from 'react';

import { Box, Container, styled } from '@mui/material';

import { cProps } from '@valhalla/react';

type Props = cProps<{
  footer?: React.ReactNode;
  header?: React.ReactNode;
}>;

const Wrapper = styled(Container)`
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

const Body = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;

export const BaseLayout: React.FC<Props> = ({ children, footer, header }) => {
  return (
    <Wrapper fixed maxWidth="xl">
      {header}
      <Body className={'body-test'}>{children}</Body>
      {footer}
    </Wrapper>
  );
};
