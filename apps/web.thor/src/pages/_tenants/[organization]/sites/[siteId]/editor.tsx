import { Page } from '@app/types/next';
import { TenantSiteLayout } from '@app/layout/tenant.site';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

const SiteEditorPage: Page = () => {
  return <div>editor</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withRedux, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          title: 'Site Editor',
        },
      },
    };
  },
);

SiteEditorPage.Layout = TenantSiteLayout;
export default SiteEditorPage;
