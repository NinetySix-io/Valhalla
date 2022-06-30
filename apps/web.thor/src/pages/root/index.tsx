import { Button, Stack, Typography } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import Link from 'next/link';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Page } from '@app/types/next';

const HomePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h1">Home</Typography>
      <Link passHref href={PAGES.ME}>
        <Button>Me</Button>
      </Link>
    </Stack>
  );
};

HomePage.Layout = BaseLayout;

export default HomePage;
