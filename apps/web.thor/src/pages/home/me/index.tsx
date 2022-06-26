import { OrganizationSection } from '@app/components/organizations.section';
import { Page } from '@app/types/next';
import { Stack } from '@mui/material';
import { withProtectedApollo } from '@app/next/plugins/with.apollo.ctx';
import { withRedux } from '@app/next/plugins/with.redux';
import { withReduxReqMeta } from '@app/next/plugins/with.req.meta';
import { withSsrPlugins } from '@app/next/plugins';

const MePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <OrganizationSection />
    </Stack>
  );
};

export const getServerSideProps = withSsrPlugins(
  [withRedux, withReduxReqMeta, withProtectedApollo],
  () => {
    return {
      props: {
        SEO: {
          title: 'NinetySix',
          titleTemplate: '%s',
          description: 'The whole operation',
        },
      },
    };
  },
);

export default MePage;
