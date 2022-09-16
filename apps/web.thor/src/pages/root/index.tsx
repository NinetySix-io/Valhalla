import { Button, Stack, Typography } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import Link from 'next/link';
import type { View } from '@app/types/next';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';

const HomeView: View = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h1">Home</Typography>
      <Link passHref href="/me">
        <Button>Me</Button>
      </Link>
    </Stack>
  );
};

export const getStaticProps = composeNextPlugins([], () => {
  return {
    props: {
      SEO: {
        title: 'NinetySix',
        titleTemplate: '%s',
      },
    },
  };
});

HomeView.Layout = BaseLayout;

export default HomeView;
