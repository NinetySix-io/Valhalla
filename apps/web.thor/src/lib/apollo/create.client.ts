import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { Environment } from '@app/env';
import { concatPagination } from '@apollo/client/utilities';

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: Environment.isServer,
    link: new HttpLink({
      uri: Environment.GQL_SERVER,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}
