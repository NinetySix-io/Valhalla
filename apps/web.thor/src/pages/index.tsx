import { Box, Typography } from '@mui/material';

import { Page } from '@app/types/next';
import { withAuthSsrContext } from '@app/next/with.app.ctx';

const HomePage: Page = () => {
  return (
    <Box>
      <Typography variant="h1">Thor</Typography>
    </Box>
  );
};

export const getServerSideProps = withAuthSsrContext(() => {
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
