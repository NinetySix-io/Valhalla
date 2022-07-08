import { MainLayout } from '@app/layout/main';
import { OrganizationList } from '@app/components/organization.list';
import { Page } from '@app/types/next';
import { Stack } from '@mui/material';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withAuth } from '@app/next/plugins/presets/with.auth';

const MePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <OrganizationList />
    </Stack>
  );
};

export const getServerSideProps = composeNextPlugins([withAuth], () => {
  return {
    props: {
      SEO: {
        title: 'Me',
      },
    },
  };
});

export default MePage;

MePage.Layout = MainLayout;
