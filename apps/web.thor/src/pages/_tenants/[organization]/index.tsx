import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { cProps } from '@valhalla/react';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useReduxSelector } from '@app/redux/hooks';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

type Props = cProps;

const OrganizationPage: Page<Props> = () => {
  const tenant = useReduxSelector((state) => state.tenant.organization);
  return <div>{tenant.id}</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withRedux, withOrgContext],
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

OrganizationPage.Layout = TenantMainLayout;

export default OrganizationPage;
