import { createHttpLink as createApolloHttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

/**
 * It creates a new HTTP link with the given headers
 * @param headers - Record<string, string> = {}
 * @returns A function that returns a link.
 */
export const createHttpLink = (
  uri: string,
  headers: Record<string, string> = {},
) => {
  return createApolloHttpLink({
    uri,
    credentials: 'include',
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
