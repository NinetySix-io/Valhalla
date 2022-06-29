import * as React from 'react';

import { useTenantHydrate } from '@app/hooks/use.org.hydrate';

type Props = {
  children?: React.ReactNode;
};

export const TenantStartupProvider: React.FC<Props> = ({ children }) => {
  const isReady = useTenantHydrate();

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
