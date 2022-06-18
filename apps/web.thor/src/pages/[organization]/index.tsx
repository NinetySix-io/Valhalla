import { Page } from '@app/types/next';
import { withAuthSsrContext } from '@app/next/with.app.ctx';

const OrganizationPage: Page = () => {
  return <div>test</div>;
};

export const getServerSideProps = withAuthSsrContext(async (ctx) => {
  return {
    props: {
      SEO: {
        title: ctx.organization.name,
      },
    },
  };
});

export default OrganizationPage;
