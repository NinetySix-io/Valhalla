import * as React from 'react';

import { Button } from '@mui/material';
import { cProps } from '@valhalla/web.react';

type Props = cProps;

export const HistoryBtn: React.FC<Props> = () => {
  return <Button>History</Button>;
};
