import * as React from 'react';

import Link from 'next/link';
import { SidebarItem } from './base';
import type { cProps } from '@valhalla/web.react';

type Props = cProps;

export const SitesItem: React.FC<Props> = (props) => {
  return (
    <Link href="/sites" passHref>
      <SidebarItem {...props}>Sites</SidebarItem>
    </Link>
  );
};
