import * as React from 'react';

import { Button, Stack } from '@mui/material';

import { cProps } from '@valhalla/web.react';

type Props = cProps;

export const EditButtons: React.FC<Props> = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button size="small">Undo</Button>
      <Button size="small">Redo</Button>
    </Stack>
  );
};
