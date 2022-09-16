import * as React from 'react';

import { Typography, styled } from '@mui/material';

import Link from 'next/link';
import { SidebarItem } from './base';
import type { cProps } from '@valhalla/web.react';

type Props = cProps;

const Title = styled(Typography)`
  font-size: large;
  font-weight: bold;
`;

export const LogoItem: React.FC<Props> = (props) => {
  return (
    <Link passHref href="/">
      <SidebarItem {...props}>
        <Title variant="h6">NinetySix</Title>
      </SidebarItem>
    </Link>
  );
};
