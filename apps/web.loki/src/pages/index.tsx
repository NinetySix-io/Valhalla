import { Grid, styled } from '@mui/material';

import { GetServerSideProps } from '@valhalla/react';
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      SEO: {
        title: 'SixtyNine',
        description: 'The whole operation',
      },
    },
    redirect: {
      permanent: false,
      destination: '/login',
    },
  };
};
