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
  width: 100%;
  height: 100vh;
`;

const Body = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const BaseLayout: React.FC<Props> = ({ children, footer, header }) => {
  return (
    <Wrapper fixed maxWidth="xl">
      {header}
      <Body>{children}</Body>
      {footer}
    </Wrapper>
  );
};
