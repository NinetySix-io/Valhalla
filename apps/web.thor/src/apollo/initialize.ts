import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { Environment } from '@app/env';
import { createApolloClient } from './create.client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function initializeApollo(props?: {
  initialState?: NormalizedCacheObject;
  headers?: Record<string, string>;
}) {
  if (Environment.isServer) {
    return createApolloClient(props);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(props);
  }

  return apolloClient;
}
