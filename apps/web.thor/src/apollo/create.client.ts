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

export async function getToken(
  headers?: Record<string, string>,
): Promise<
  Pick<GetAccessTokenQueryResult['data']['accessToken'], 'expiresAt' | 'token'>
> {
  const client = createApolloClient({ headers });
  const query = GetAccessTokenDocument;
  const result = await client.query({ query });
  return result.data.accessToken;
}

export const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getStore()?.getState().meta.accessToken,
    },
  };
});

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
