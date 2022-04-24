import * as React from 'react';

import { Box } from '@mui/material';
import { cProps } from '@valhalla/react';
import { styled } from '@mui/material/styles';

type Props = cProps;

const Container = styled(Box)``;

export const Footer: React.FC<Props> = () => {
  return <Container>footer</Container>;
};
