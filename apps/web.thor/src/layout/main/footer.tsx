import * as React from 'react';

import { Box } from '@mui/material';
import { cProps } from '@valhalla/web.react';

type Props = cProps;

export const Footer: React.FC<Props> = () => {
  return <Box maxWidth="xl">footer</Box>;
};
