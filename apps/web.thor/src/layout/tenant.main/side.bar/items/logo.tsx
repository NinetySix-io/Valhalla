import * as React from 'react';

import Link from 'next/link';
import { Logo } from '@valhalla/web.react';
import { SidebarItem } from './base';

export const LogoItem: React.FC = (props) => {
  return (
    <Link passHref href="/">
      <SidebarItem {...props}>
        <Logo variant="black" width={50} height={50} />
      </SidebarItem>
    </Link>
  );
};
