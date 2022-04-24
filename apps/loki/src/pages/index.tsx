import { Grid, styled } from '@mui/material';

import { Logo } from '@valhalla/react';

const Page = styled(Grid)`
  flex-grow: 1;
`;

export default function Home() {
  return (
    <Page container>
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>form</Grid>
    </Page>
  );
}
