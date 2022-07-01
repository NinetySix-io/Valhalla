import * as React from 'react';

import { FaReg, Icon, cProps } from '@valhalla/react';

import Link from 'next/link';
import { ListItemIcon } from '@mui/material';
import { MenuItem } from './base';

type Props = cProps;

export const SitesItem: React.FC<Props> = () => {
  return (
    <Link href="/sites" passHref>
      <MenuItem>
        <ListItemIcon>
          <Icon icon={FaReg.faWindowMaximize} fontSize={20} />
        </ListItemIcon>
      </MenuItem>
    </Link>
  );
};
