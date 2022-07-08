import * as React from 'react';

import { FaSolid, Icon } from '@valhalla/react';

import { IconButton } from '@mui/material';

export const UndoBtn: React.FC = () => {
  return (
    <IconButton color={'primary'}>
      <Icon icon={FaSolid.faArrowTurnUp} rotation={270} />
    </IconButton>
  );
};
