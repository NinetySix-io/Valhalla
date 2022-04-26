import { Box, Typography, styled } from '@mui/material';

import { GetServerSideProps } from '@valhalla/react';
import Link from 'next/link';

const Page = styled(Box)`
  flex-grow: 1;
`;

export default function Home() {
  return (
    <Page>
      <Typography variant="h1">Thor</Typography>
      <Link href="/login">Login</Link>
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