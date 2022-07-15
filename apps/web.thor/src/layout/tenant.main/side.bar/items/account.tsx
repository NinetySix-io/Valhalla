import * as React from 'react';

import Link from 'next/link';
import { SidebarItem } from './base';
import { cProps } from '@valhalla/react';

type Props = cProps;

export const AccountItem: React.FC<Props> = (props) => {
  return (
    <Link href="/me" passHref>
      <SidebarItem {...props} popoverContent={<div>test</div>}>
        Account
      </SidebarItem>
    </Link>
  );
};
