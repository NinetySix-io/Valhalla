import { Box, Button } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import { FaUser } from 'react-icons/fa';
import { FormContainer } from '@app/components/form.container';
import { GetServerSideProps } from '@valhalla/react';
import NextLink from 'next/link';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Page } from '@app/types/next';
import React from 'react';
import { buildReturnableLink } from '@app/lib/router.utils';
import cx from 'clsx';
import styles from './styles.module.css';

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
          href={buildReturnableLink(PAGES.GET_STARTED_WITH_USERNAME)}
        >
          <Button
            fullWidth
            variant="outlined"
            className={cx(styles.button)}
            startIcon={<FaUser />}
          >
            Login with Email/Phone
          </Button>
        </NextLink>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = () => {
  return {
    props: {
      SEO: {
        title: 'Get Started',
      },
    },
  };
};

GetStartedPage.Layout = BaseLayout;

export default GetStartedPage;
