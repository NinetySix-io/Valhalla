import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { cProps } from '@valhalla/react';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

const OrganizationPage: Page<Props> = () => {
  const tenant = useReduxSelector((state) => state.tenant.organization);

  return <div>{tenant.id}</div>;
};

OrganizationPage.Layout = TenantMainLayout;

export default OrganizationPage;
