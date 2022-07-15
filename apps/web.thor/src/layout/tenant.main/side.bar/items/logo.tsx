import * as React from 'react';

import { Typography, styled } from '@mui/material';

import Link from 'next/link';
import { SidebarItem } from './base';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Title = styled(Typography)`
  font-size: large;
  font-weight: bold;
`;

export const LogoItem: React.FC<Props> = (props) => {
  return (
    <Link href="/" passHref>
      <SidebarItem {...props}>
        <Title variant="h6">NinetySix</Title>
      </SidebarItem>
    </Link>
  );
};
