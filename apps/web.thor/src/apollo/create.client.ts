import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { Environment } from '@app/env';
import { authLink } from './auth.link';
import { authRedirectLink } from './auth.redirect.link';
import { createHttpLink } from './http.link';
import { getErrorLink } from './error.link';

/**
 * It creates an Apollo Client instance
 */
export function createApolloClient(options?: {
  withLogger?: boolean;
  headers?: Record<string, string>;
  initialState?: NormalizedCacheObject;
}) {
  const links = [
    authLink,
    authRedirectLink,
    getErrorLink({ headers: options.headers }),
    createHttpLink(Environment.GQL_SERVER, options?.headers),
  ];

  if (options?.withLogger && Environment.isDev && !Environment.isServer) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    links.unshift(require('apollo-link-logger').default);
  }

  return new ApolloClient({
    ssrMode: Environment.isServer,
    link: ApolloLink.from(links),
    cache: new InMemoryCache().restore(options.initialState),
  });
}
