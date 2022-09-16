import { Box, Button } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import NextLink from 'next/link';
import type { ParsedUrlQuery } from 'querystring';
import { SSO_PAGES } from '@app/PAGES_CONSTANTS';
import type { View } from '@app/types/next';
import { buildReturnableUrl } from '@app/lib/router.utils/returnable';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import cx from 'clsx';
import styles from './styles.module.css';
import { withAuthorizedRedirect } from '@app/next/plugins/presets/with.authorized';

type Props = {
  query: ParsedUrlQuery;
};

const AuthView: View<Props> = ({ query }) => {
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
          href={buildReturnableUrl(SSO_PAGES.WITH_USERNAME, {
            query,
          })}
        >
          <Button fullWidth variant="outlined" className={cx(styles.button)}>
            Login with Email/Phone
          </Button>
        </NextLink>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps = composeNextPlugins(
  [withAuthorizedRedirect],
  (ctx) => {
    return {
      props: {
        query: ctx.ssrCtx.query,
        SEO: {
          title: 'Get started',
        },
      },
    };
  },
);

export default AuthView;

AuthView.Layout = BaseLayout;
