import * as React from 'react';

import Link from 'next/link';
import { SidebarItem } from './base';

export const AccountItem: React.FC = (props) => {
  return (
    <Link passHref href="/me">
      <SidebarItem {...props} popoverContent={<div>test</div>}>
        Account
      </SidebarItem>
    </Link>
  );
};
