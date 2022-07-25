import * as React from 'react';

import { AppBar, Box, Container, Toolbar } from '@mui/material';

import { AccountBtn } from '@app/components/account.btn';
import { Logo } from '@app/components/logo';
import { cProps } from '@valhalla/web.react';

type Props = cProps;

export const Header: React.FC<Props> = () => {
  return (
    <AppBar color="transparent" position="relative" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Logo size={30} />
          </Box>
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
          >
            <AccountBtn />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
