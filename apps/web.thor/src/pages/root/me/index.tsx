import { MainLayout } from '@app/layout/main';
import { OrganizationSection } from '@app/components/organizations.section';
import { Page } from '@app/types/next';
import { Stack } from '@mui/material';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withAuth } from '@app/next/plugins/presets/with.auth';

const MePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <OrganizationSection />
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
