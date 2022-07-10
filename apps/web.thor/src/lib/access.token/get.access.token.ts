import {
  GetAccessTokenQuery,
  refetchGetAccessTokenQuery,
} from '@app/generated/valhalla.gql';

import { ApolloClient } from '@apollo/client';
import { Environment } from '@app/env';
import { IncomingHttpHeaders } from 'http';
import { MetaSlice } from '@app/redux/slices/meta';
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
    options.organizationId ||
    // TODO: this is little awkward,
    // should probably find a better way to get this data
    store.getState().Tenant.organization?.id;

  const result = await client.query<GetAccessTokenQuery>(
    refetchGetAccessTokenQuery({
      organization,
    }),
  );

  const accessToken = result?.data?.accessToken;

  if (accessToken) {
    store.dispatch(MetaSlice.actions.setAccessToken(accessToken.value));
  }

  return accessToken;
}
