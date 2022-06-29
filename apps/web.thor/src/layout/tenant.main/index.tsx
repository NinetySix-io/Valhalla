import * as React from 'react';

import { BaseLayout } from '../base';
import { TenantStartupProvider } from '@app/components/tenant.startup.provider';
import { cProps } from '@valhalla/react';

type Props = cProps;

export const TenantMainLayout: React.FC<Props> = ({ children }) => {
  return (
    <TenantStartupProvider>
      <BaseLayout>{children}</BaseLayout>
    </TenantStartupProvider>
  );
};
