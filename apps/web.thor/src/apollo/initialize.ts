import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { Environment } from '@app/env';
import { createApolloClient } from './create.client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * If we're on the server, create a new Apollo Client. If we're on the client, create a new Apollo
 * Client if one doesn't already exist
 */
export function initializeApollo(
  options: Parameters<typeof createApolloClient>[0],
) {
  if (Environment.isServer) {
    return createApolloClient(options);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(options);
  }

  return apolloClient;
}
