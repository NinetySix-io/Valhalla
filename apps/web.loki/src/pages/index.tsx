import { Grid, styled } from '@mui/material';

import { GetServerSideProps } from '@valhalla/react';
import { Logo } from '@valhalla/react';

const Page = styled(Grid)`
  flex-grow: 1;
`;

export default function HomePage() {
  return (
    <Page container>
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>form</Grid>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = () => {
  return {
    props: {
      SEO: {
        title: 'NinetySix',
        description: 'The whole operation',
        titleTemplate: '%s',
      },
    },
  };
};
