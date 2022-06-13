import { Box, Typography } from '@mui/material';

import { Page } from '@app/types/next';
import { withSsrContext } from '@app/lib/next/with.ssr.ctx';

const HomePage: Page = () => {
  return (
    <Box>
      <Typography variant="h1">Thor</Typography>
    </Box>
  );
};

export const getServerSideProps = withSsrContext(() => {
  return {
    props: {
      SEO: {
        title: 'NinetySix',
        titleTemplate: '%s',
        description: 'The whole operation',
      },
    },
  };
});

export default HomePage;
