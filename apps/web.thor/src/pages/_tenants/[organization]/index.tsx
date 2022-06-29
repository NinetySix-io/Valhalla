import { GetStaticProps, cProps } from '@valhalla/react';

import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

const OrganizationPage: Page<Props> = () => {
  const tenant = useReduxSelector((state) => state.tenant.organization);

  return <div>{tenant.id}</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      SEO: {
        title: 'Home',
      },
    },
  };
};

OrganizationPage.Layout = TenantMainLayout;

export default OrganizationPage;
