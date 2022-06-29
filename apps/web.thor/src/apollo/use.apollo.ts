import * as React from 'react';

import { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from './initialize';

export function useApollo(pageProps?: { apolloState: NormalizedCacheObject }) {
  const store = React.useMemo(
    () => initializeApollo({ initialState: pageProps?.apolloState }),
    [pageProps],
  );

  return store;
}
