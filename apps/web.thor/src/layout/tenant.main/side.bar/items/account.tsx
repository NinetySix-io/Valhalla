import * as React from 'react';

import Link from 'next/link';
import { SidebarItem } from './base';
import type { cProps } from '@valhalla/web.react';

type Props = cProps;

export const AccountItem: React.FC<Props> = (props) => {
  return (
    <Link passHref href="/me">
      <SidebarItem {...props} popoverContent={<div>test</div>}>
        Account
      </SidebarItem>
    </Link>
  );
};
