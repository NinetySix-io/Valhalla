import * as React from 'react';

import { Button } from '@mui/material';
import { cProps } from '@valhalla/react';

type Props = cProps;

export const FinishBtn: React.FC<Props> = () => {
  return (
    <Button variant="contained" size="small">
      Done
    </Button>
  );
};
