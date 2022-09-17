import * as React from 'react';

import { Button, Stack } from '@mui/material';

export const EditButtons: React.FC = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button size="small">Undo</Button>
      <Button size="small">Redo</Button>
    </Stack>
  );
};
