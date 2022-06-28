import { withApollo, withRedux, withSsrPlugins } from '@app/next/plugins';

import { OrganizationSection } from '@app/components/organizations.section';
import { Page } from '@app/types/next';
import { Stack } from '@mui/material';

const MePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <OrganizationSection />
    </Stack>
  );
};

export const getServerSideProps = withSsrPlugins(
  [withRedux, withApollo({ protected: true })],
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
