import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import type { View } from '@app/types/next';

const TenantMeView: View = () => {
  return <div>me</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          noindex: true,
          nofollow: true,
          title: 'Me',
        },
      },
    };
  },
);

TenantMeView.Layout = TenantMainLayout;
export default TenantMeView;
