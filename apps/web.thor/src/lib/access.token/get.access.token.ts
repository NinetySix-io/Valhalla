import {
  GetAccessTokenDocument,
  GetAccessTokenQuery,
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
  headers?: Record<string, string> | IncomingHttpHeaders;
}) {
  const client =
    options?.client ??
    new TemporaryApolloClient({
      uri: Environment.GQL_SERVER,
      headers: options.headers as Record<string, string>,
    });

  const result = await client.query<GetAccessTokenQuery>({
    query: GetAccessTokenDocument,
  });

  return result.data?.accessToken;
}
