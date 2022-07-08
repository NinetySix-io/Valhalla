import * as React from 'react';

import { FaSolid, Icon } from '@valhalla/react';

import { IconButton } from '@mui/material';

export const RedoBtn: React.FC = () => {
  return (
    <IconButton color={'primary'}>
      <Icon icon={FaSolid.faArrowTurnDown} rotation={270} />
    </IconButton>
  );
};
