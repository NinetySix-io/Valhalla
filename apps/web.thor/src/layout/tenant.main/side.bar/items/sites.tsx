import * as React from 'react';

import { FaReg, cProps } from '@valhalla/react';

import Link from 'next/link';
import { SidebarItem } from './base';

type Props = cProps;

export const SitesItem: React.FC<Props> = (props) => {
  return (
    <Link href="/sites" passHref>
      <SidebarItem {...props} icon={FaReg.faWindowMaximize}>
        Sites
      </SidebarItem>
    </Link>
  );
};
