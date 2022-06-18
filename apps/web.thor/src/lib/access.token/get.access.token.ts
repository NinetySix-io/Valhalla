import {
  GetAccessTokenQuery,
  refetchGetAccessTokenQuery,
} from '@app/graphql/valhalla/generated.gql';

import { ApolloClient } from '@apollo/client';
import { Environment } from '@app/env';
import { IncomingHttpHeaders } from 'http';
import { TemporaryApolloClient } from '@app/apollo/temp.client';

/**
 * It returns the access token from the server
 */
export async function getAccessToken(options?: {
  client?: ApolloClient<unknown>;
  headers?: IncomingHttpHeaders;
  organization?: string;
}) {
  const client =
    options?.client ??
    new TemporaryApolloClient({
      uri: Environment.GQL_SERVER,
      headers: options.headers,
    });

  const result = await client.query<GetAccessTokenQuery>(
    refetchGetAccessTokenQuery({
      organization: options?.organization,
    }),
  );

  return result.data.accessToken;
}
