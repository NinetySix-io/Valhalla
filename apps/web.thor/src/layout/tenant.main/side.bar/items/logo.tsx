import * as React from 'react';

import { Logo, cProps } from '@valhalla/react';
import { Typography, styled } from '@mui/material';

import Link from 'next/link';
import { SidebarItem } from './base';

type Props = cProps;

const Title = styled(Typography)`
  font-size: large;
  font-weight: bold;
`;

export const LogoItem: React.FC<Props> = (props) => {
  return (
    <Link href="/" passHref>
      <SidebarItem {...props} icon={<Logo height={25} width={25} />}>
        <Title variant="h6">NinetySix</Title>
      </SidebarItem>
    </Link>
  );
};
