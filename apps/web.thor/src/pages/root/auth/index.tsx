import { Box, Button } from '@mui/material';
import { FaSolid, GetServerSideProps, Icon } from '@valhalla/react';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import NextLink from 'next/link';
import { Page } from '@app/types/next';
import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import { SSO_PAGES } from '@app/PAGES_CONSTANTS';
import cx from 'clsx';
import styles from './styles.module.css';
import { useReturnableLink } from '@app/hooks/use.returnable.link';
import { useRouter } from 'next/router';

const AuthPage: Page = () => {
  const router = useRouter();
  const buildLink = useReturnableLink();

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
          href={buildLink(SSO_PAGES.WITH_USERNAME, {
            query: router.query,
          })}
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

export const getServerSideProps: GetServerSideProps = (ctx) => {
  if (ctx.req.cookies[REFRESH_TOKEN_KEY]) {
    const query = ctx.query as Record<string, string>;
    const params = new URLSearchParams(query);

    return {
      redirect: {
        destination: `/api/auth/redirect?${params.toString()}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

AuthPage.Layout = BaseLayout;

export default AuthPage;
