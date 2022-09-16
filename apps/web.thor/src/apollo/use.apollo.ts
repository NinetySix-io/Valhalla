import * as React from 'react';

import type { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from './initialize';
import { Environment } from '@app/env';
import { TenantStore } from '@app/global.store/tenant';
import { MetaStore } from '@app/global.store/meta';

export function useApollo(pageProps: { apolloState: NormalizedCacheObject }) {
  const orgId = TenantStore.useSelect((state) => state.organization?.id);
  const client = React.useMemo(
    () =>
      Environment.isServer
        ? initializeApollo({
            initialState: pageProps?.apolloState,
            organizationId: null,
          })
        : initializeApollo({
            initialState: pageProps?.apolloState,
            organizationId: orgId,
            onAccessToken: MetaStore.actions.setAccessToken,
            getAccessToken: () => MetaStore.getState().accessToken,
          }),
    [pageProps, orgId],
  );

  return client;
}
