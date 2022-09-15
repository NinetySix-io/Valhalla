import * as React from 'react';

import type { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from './initialize';

export function useApollo(pageProps: { apolloState: NormalizedCacheObject }) {
  const client = React.useMemo(
    () =>
      initializeApollo({
        initialState: pageProps?.apolloState,
        organizationId: null,
        // organizationId: store.getState().Tenant?.organization?.id,
        getAccessToken: () => null,
        onAccessToken: () => null,
        // getAccessToken: () => store.getState().Meta.accessToken,
        // onAccessToken: (accessToken) =>
        //   store.dispatch(MetaSlice.actions.setAccessToken(accessToken)),
      }),
    [pageProps],
  );

  return client;
}
