import * as React from 'react';

import type { MenuProps } from '@mui/material';
import { Menu as MuiMenu } from '@mui/material';

type Props = MenuProps;

export const Menu: React.FC<Props> = (props) => {
  return <MuiMenu {...props}>test</MuiMenu>;
};
