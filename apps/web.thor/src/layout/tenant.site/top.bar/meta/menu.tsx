import * as React from 'react';

import { MenuProps, Menu as MuiMenu } from '@mui/material';

type Props = MenuProps;

export const Menu: React.FC<Props> = (props) => {
  return <MuiMenu {...props}>test</MuiMenu>;
};
