import * as React from 'react';

import { Button, Stack } from '@mui/material';

import { cProps } from '@valhalla/react';

type Props = cProps;

export const EditButtons: React.FC<Props> = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button size="small">Backward</Button>
      <Button size="small">Forward</Button>
    </Stack>
  );
};
