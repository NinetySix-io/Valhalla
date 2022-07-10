import {
  GetAccessTokenQuery,
  refetchGetAccessTokenQuery,
} from '@app/generated/valhalla.gql';

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

  const organization =
    options.organizationId ||
    // TODO: this is little awkward,
    // should probably find a better way to get this data
    getStore().getState().Tenant.organization?.id;

  const result = await client.query<GetAccessTokenQuery>(
    refetchGetAccessTokenQuery({
      organization,
    }),
  );

  return result.data.accessToken;
}
