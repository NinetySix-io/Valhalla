import * as React from 'react';

import { Box, Container, styled } from '@mui/material';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const LayoutBody = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  align-items: center;

  > * {
    width: 100%;
  }
`;

type Props = React.ComponentProps<typeof Container>;

export const BaseLayout: React.FC<Props> = (props) => {
  return <Wrapper className={'test'} fixed maxWidth="xl" {...props} />;
};
