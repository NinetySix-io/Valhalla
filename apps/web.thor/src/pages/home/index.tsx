import { Stack, Typography } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import { Page } from '@app/types/next';

const HomePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h1">Home</Typography>
    </Stack>
  );
};

HomePage.Layout = BaseLayout;

export default HomePage;
