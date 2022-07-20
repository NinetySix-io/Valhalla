import { createHttpLink as createApolloHttpLink } from '@apollo/client';

/**
 * It creates a new HTTP link with the given headers
 */
export const buildHttpLink = (
  uri: string,
  headers: Record<string, string> = {},
) => {
  return createApolloHttpLink({
    uri,
    headers,
    credentials: 'same-origin',
  });
};
