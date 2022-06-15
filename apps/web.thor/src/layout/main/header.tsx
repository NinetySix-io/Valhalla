import * as React from 'react';

import { AccountBtn } from '@app/components/account.btn';
import { Grid } from '@mui/material';
import { Logo } from '@app/components/logo';
import { cProps } from '@valhalla/react';

type Props = cProps;

export const Header: React.FC<Props> = () => {
  return (
    <Grid
      maxWidth="xl"
      flexDirection="row"
      display="flex"
      justifyContent="space-between"
      overflow="hidden"
      alignItems="center"
      padding={1}
    >
      <Grid item>
        <Logo objectFit="contain" height="35px" width="35px" />
      </Grid>
      <Grid item>
        <AccountBtn />
      </Grid>
    </Grid>
  );
};
