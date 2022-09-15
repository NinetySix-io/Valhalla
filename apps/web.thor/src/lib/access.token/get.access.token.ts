import type { GetAccessTokenQuery } from '@app/generated/valhalla.gql';
import { refetchGetAccessTokenQuery } from '@app/generated/valhalla.gql';

import type { ApolloClient } from '@apollo/client';
import { Environment } from '@app/env';
import type { IncomingHttpHeaders } from 'http';
import { TemporaryApolloClient } from '@app/apollo/temp.client';

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

  const organization = options.organizationId;
  const result = await client.query<GetAccessTokenQuery>(
    refetchGetAccessTokenQuery({
      organization,
    }),
  );

  const accessToken = result?.data?.accessToken;
  return accessToken;
}
