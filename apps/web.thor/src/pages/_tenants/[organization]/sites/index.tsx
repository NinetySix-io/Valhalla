import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

const SiteListPage: Page = () => {
  return <div>Sites</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withRedux, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          title: 'Sites',
        },
      },
    };
  },
);

SiteListPage.Layout = TenantMainLayout;
export default SiteListPage;
