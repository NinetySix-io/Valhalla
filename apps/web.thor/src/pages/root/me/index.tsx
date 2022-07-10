import { MainLayout } from '@app/layout/main';
import { OrganizationList } from '@app/components/organization.list';
import { Stack } from '@mui/material';
import { View } from '@app/types/next';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withAuth } from '@app/next/plugins/presets/with.auth';

const MeView: View = () => {
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

export default MeView;

MeView.Layout = MainLayout;
