import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  fromPromise,
} from '@apollo/client';

import { Environment } from '@app/env';
import { createHttpLink } from './http.link';
import { getAccessToken } from '@app/lib/access.token/get.access.token';
import { getStore } from '@app/redux';
import { isNil } from '@valhalla/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getStore()?.getState().meta.accessToken,
    },
  };
});

/**
 * It returns a link that will intercept errors from the server, check if the error is a 401, and if
 * so, it will get a new access token and retry the request
 * @param headers - Record<string, string> = {}
 * @param [onAccessToken] - A callback that will be called when the access token is refreshed.
 * @returns A function that takes in two parameters, headers and onAccessToken.
 */
export const getErrorLink = (
  headers: Record<string, string> = {},
  onAccessToken?: (
    accessToken: Awaited<ReturnType<typeof getAccessToken>>,
  ) => void,
) => {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(getAccessToken({ headers }))
            .filter((value) => !isNil(value))
            .flatMap((accessToken) => {
              onAccessToken?.(accessToken);
              operation.setContext({
                accessToken,
                headers: {
                  ...operation.getContext().headers,
                  ...headers,
                  authorization: accessToken.value,
                },
              });

              return forward(operation);
            });
        }
      }
    }
  });
};

/**
 * It creates an Apollo Client instance with a link chain that includes an auth link, an error link,
 * and an http link
 * @param [options] - {
 * @returns A function that returns an ApolloClient
 */
export function createApolloClient(options?: {
  withLogger?: boolean;
  headers?: Record<string, string>;
  initialState?: NormalizedCacheObject;
  onAccessToken?: Parameters<typeof getErrorLink>[1];
}) {
  const links = [
    authLink,
    getErrorLink(options?.headers, options.onAccessToken),
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
