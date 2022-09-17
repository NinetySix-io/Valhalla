import * as React from 'react';

import Link from 'next/link';
import { SidebarItem } from './base';

export const SitesItem: React.FC = (props) => {
  return (
    <Link passHref href="/sites">
      <SidebarItem {...props}>Sites</SidebarItem>
    </Link>
  );
};
