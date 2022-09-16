import { ApolloLink } from '@apollo/client';
import { Environment } from '@app/env';
import { MetaStore } from '@app/global.store/meta';
import type { ModGraphQLErrorExtensions } from '@app/types/apollo';

export const authRedirectLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    if (data.errors) {
      for (const error of data.errors) {
        const extensions = error.extensions as ModGraphQLErrorExtensions;
        if (extensions.response.statusCode === 403) {
          if (!Environment.isServer) {
            MetaStore.actions.setRequireAuth(true);
          }
        }
      }
    }

    return data;
  });
});
