import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { Environment } from '@app/env';
import { authRedirectLink } from './auth.redirect.link';
import { buildAuthLink } from './auth.link';
import { buildErrorLink } from './error.link';
import { buildHttpLink } from './http.link';

/**
 * It creates an Apollo Client instance
 */
export function createApolloClient(
  options?: {
    withLogger?: boolean;
    headers?: Record<string, string>;
    initialState?: NormalizedCacheObject;
  } & Pick<
    Parameters<typeof buildErrorLink>[0],
    'onAccessToken' | 'organizationId'
  > &
    Pick<Parameters<typeof buildAuthLink>[0], 'getAccessToken'>,
) {
  const authLink = buildAuthLink({ getAccessToken: options.getAccessToken });
  const httpLink = buildHttpLink(Environment.GQL_SERVER, options?.headers);
  const errorLink = buildErrorLink({
    organizationId: options.organizationId,
    headers: options.headers,
    onAccessToken: options.onAccessToken,
  });

  const links = [authLink, authRedirectLink, errorLink, httpLink];
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
