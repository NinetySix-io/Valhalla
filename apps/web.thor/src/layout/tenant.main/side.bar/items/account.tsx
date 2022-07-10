import * as React from 'react';

import { FaReg, cProps } from '@valhalla/react';

import Link from 'next/link';
import { SidebarItem } from './base';

type Props = cProps;

export const AccountItem: React.FC<Props> = (props) => {
  return (
    <Link href="/me" passHref>
      <SidebarItem
        {...props}
        icon={FaReg.faUser}
        popoverContent={<div>test</div>}
      >
        Account
      </SidebarItem>
    </Link>
  );
};
