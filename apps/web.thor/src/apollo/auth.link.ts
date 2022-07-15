import { setContext } from '@apollo/client/link/context';

export const buildAuthLink = (options: { getAccessToken: () => string }) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: options.getAccessToken(),
      },
    };
  });
