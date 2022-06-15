import { Box, Button } from '@mui/material';
import { FaSolid, Icon } from '@valhalla/react';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import NextLink from 'next/link';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Page } from '@app/types/next';
import { buildClientReturnableLink } from '@app/lib/router.utils';
import cx from 'clsx';
import styles from './styles.module.css';
import { withPublicSsrContext } from '@app/next/with.app.ctx';

const GetStartedPage: Page = () => {
  return (
    <Box
      maxWidth="md"
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <FormContainer title="Continue">
        <NextLink
          passHref
          href={buildClientReturnableLink(PAGES.AUTH_WITH_USERNAME)}
        >
          <Button
            fullWidth
            variant="outlined"
            className={cx(styles.button)}
            startIcon={<Icon icon={FaSolid.faUser} />}
          >
            Login with Email/Phone
          </Button>
        </NextLink>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps = withPublicSsrContext(() => {
  return {
    props: {
      SEO: {
        title: 'Authentication',
      },
    },
  };
});

GetStartedPage.Layout = BaseLayout;

export default GetStartedPage;
