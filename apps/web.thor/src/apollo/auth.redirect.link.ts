import { ApolloLink } from '@apollo/client';
// import { MetaSlice } from '@app/global.store/meta';
import type { ModGraphQLErrorExtensions } from '@app/types/apollo';
// import { getStore } from '@app/global.store';

export const authRedirectLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    if (data.errors) {
      for (const error of data.errors) {
        const extensions = error.extensions as ModGraphQLErrorExtensions;
        if (extensions.response.statusCode === 403) {
          // getStore().dispatch(MetaSlice.actions.setRequireAuth(true));
        }
      }
    }

    return data;
  });
});
