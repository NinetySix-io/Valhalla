import * as React from 'react';

import { Typography, styled } from '@mui/material';

import Link from 'next/link';
import { SidebarItem } from './base';

const Title = styled(Typography)`
  font-size: large;
  font-weight: bold;
`;

export const LogoItem: React.FC = (props) => {
  return (
    <Link passHref href="/">
      <SidebarItem {...props}>
        <Title variant="h6">NinetySix</Title>
      </SidebarItem>
    </Link>
  );
};
