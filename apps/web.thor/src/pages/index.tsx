import { OrganizationSection } from '@app/components/organizations.section';
import { Page } from '@app/types/next';
import { Stack } from '@mui/material';
import { withAuthSsrContext } from '@app/next/with.app.ctx';

const HomePage: Page = () => {
  return (
    <Stack direction="column" spacing={4}>
      <OrganizationSection />
    </Stack>
  );
};

export const getServerSideProps = withAuthSsrContext(() => {
  return {
    props: {
      SEO: {
        title: 'NinetySix',
        titleTemplate: '%s',
        description: 'The whole operation',
      },
    },
  };
});

export default HomePage;
