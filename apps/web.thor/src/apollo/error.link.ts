import type { ModGraphQLErrorExtensions } from '@app/types/apollo';
import { fromPromise } from '@apollo/client';
import { getAccessToken } from '@app/lib/access.token';
import isNil from 'lodash.isnil';
import { onError } from '@apollo/client/link/error';
import type { BasicObject } from '@valhalla/utilities';

/**
 * It will intercept any errors from the GraphQL server, and if the error is a 401, it will attempt to
 * get a new access token and retry the request
 */
export const buildErrorLink = (options?: {
  headers?: BasicObject<string>;
  organizationId?: string;
  onAccessToken?: (accessToken: string) => void;
}) => {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        const extensions = error.extensions as ModGraphQLErrorExtensions;
        const statusCode = extensions.response?.statusCode;
        if (statusCode === 401) {
          const headers = options?.headers ?? {};
          return fromPromise(
            getAccessToken({
              headers,
              organizationId: options?.organizationId,
            }),
          )
            .filter((value) => !isNil(value))
            .flatMap((accessToken) => {
              options?.onAccessToken?.(accessToken.value);
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
