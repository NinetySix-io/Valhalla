import { Box, Typography, styled } from '@mui/material';

import { GetServerSideProps } from 'next';
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
    props: {},
    redirect: {
      permanent: false,
      destination: '/login',
    },
  };
};
