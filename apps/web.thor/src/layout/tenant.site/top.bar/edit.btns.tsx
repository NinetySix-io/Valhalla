import * as React from 'react';

import { Button, ButtonGroup } from '@mui/material';

import { cProps } from '@valhalla/react';

type Props = cProps;

export const EditButtons: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <ButtonGroup size="small">
        <Button>Backward</Button>
        <Button>Forward</Button>
      </ButtonGroup>
    </React.Fragment>
  );
};
