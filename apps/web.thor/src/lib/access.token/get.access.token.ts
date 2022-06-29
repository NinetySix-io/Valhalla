import {
  GetAccessTokenQuery,
  refetchGetAccessTokenQuery,
} from '@app/graphql/valhalla/generated.gql';

import { ApolloClient } from '@apollo/client';
import { Environment } from '@app/env';
import { IncomingHttpHeaders } from 'http';
import { TemporaryApolloClient } from '@app/apollo/temp.client';
import { getStore } from '@app/redux';

/**
 * It returns the access token from the server
 */
export async function getAccessToken(options?: {
  client?: ApolloClient<unknown>;
  headers?: IncomingHttpHeaders;
  organizationId?: string;
}) {
  const client =
    options?.client ??
    new TemporaryApolloClient({
      uri: Environment.GQL_SERVER,
      headers: options.headers,
    });

  const store = getStore();
  const organization =
    options.organizationId || store.getState().tenant.organization?.id;

  const result = await client.query<GetAccessTokenQuery>(
    refetchGetAccessTokenQuery({
      organization,
    }),
  );

  return result.data.accessToken;
}
