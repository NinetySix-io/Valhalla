import * as React from 'react';

import { MetaSlice } from '@app/redux/slices/meta';
import { NormalizedCacheObject } from '@apollo/client';
import { Store } from '@app/redux';
import { initializeApollo } from './initialize';

export function useApollo(
  pageProps: { apolloState: NormalizedCacheObject },
  store: Store,
) {
  const client = React.useMemo(
    () =>
      initializeApollo({
        initialState: pageProps?.apolloState,
        organizationId: store.getState().Tenant?.organization?.id,
        getAccessToken: () => store.getState().Meta.accessToken,
        onAccessToken: (accessToken) =>
          store.dispatch(MetaSlice.actions.setAccessToken(accessToken)),
      }),
    [pageProps, store],
  );

  return client;
}
