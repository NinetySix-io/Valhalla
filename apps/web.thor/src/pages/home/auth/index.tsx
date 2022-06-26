import { Box, Button } from '@mui/material';
import { FaSolid, Icon } from '@valhalla/react';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import NextLink from 'next/link';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Page } from '@app/types/next';
import cx from 'clsx';
import styles from './styles.module.css';
import { useReturnableLink } from '@app/hooks/use.returnable.link';
import { useSessionResume } from '@app/hooks/use.session.resume';

const AuthPage: Page = () => {
  useSessionResume();
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
        <NextLink passHref href={buildLink(PAGES.AUTH_WITH_USERNAME)}>
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

AuthPage.Layout = BaseLayout;

export default AuthPage;
