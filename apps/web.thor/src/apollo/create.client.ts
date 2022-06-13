import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  fromPromise,
} from '@apollo/client';
import {
  GetAccessTokenDocument,
  GetAccessTokenQueryResult,
} from '@app/graphql/valhalla/generated.gql';

import { Environment } from '@app/env';
import fetch from 'isomorphic-unfetch';
import { getStore } from '@app/redux';
import { isNil } from '@valhalla/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

/**
 * It creates a new HTTP link with the given headers
 * @param headers - Record<string, string> = {}
 * @returns A function that returns a link.
 */
export const getHttpLink = (headers: Record<string, string> = {}) => {
  return createHttpLink({
    uri: Environment.GQL_SERVER,
    credentials: 'same-origin',
    fetch: (url, init) => {
      return fetch(url, {
        ...init,
        headers: {
          ...init.headers,
          ...(headers ?? {}),
        },
      });
    },
  });
};

/**
 * It gets an access token from the server, and returns it
 * @param [headers] - The headers that are passed to the server.
 * @returns an object with a headers property.
 */
export async function getToken(
  headers?: Record<string, string>,
): Promise<
  Pick<GetAccessTokenQueryResult['data']['accessToken'], 'expiresAt' | 'token'>
> {
  const client = new ApolloClient({
    ssrMode: Environment.isServer,
    link: getHttpLink(headers),
    cache: new InMemoryCache(),
  });

  const query = GetAccessTokenDocument;
  const result = await client.query({ query });
  return result.data.accessToken;
}

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
  onAccessToken?: (accessToken: Awaited<ReturnType<typeof getToken>>) => void,
) => {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(getToken(headers))
            .filter((value) => !isNil(value))
            .flatMap((accessToken) => {
              onAccessToken?.(accessToken);
              operation.setContext({
                accessToken,
                headers: {
                  ...operation.getContext().headers,
                  ...headers,
                  authorization: accessToken.token,
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
    getHttpLink(options?.headers),
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
