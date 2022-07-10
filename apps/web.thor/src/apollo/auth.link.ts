import { getStore } from '@app/redux';
import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers }) => {
  const token = getStore().getState().Meta.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});
