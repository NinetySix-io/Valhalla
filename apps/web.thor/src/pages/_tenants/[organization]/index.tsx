import { useOrgCtx } from '@app/hooks/hydrate/use.org.hydrate';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import type { View } from '@app/types/next';
import type { cProps } from '@valhalla/web.react';

type Props = cProps;

const OrganizationView: View<Props> = () => {
  const tenant = useOrgCtx();
  return <div>{tenant.id}</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          title: 'Home',
        },
      },
    };
  },
);

OrganizationView.Layout = TenantMainLayout;

export default OrganizationView;
