import {
  FindOrganizationBySlugDocument,
  FindOrganizationBySlugQuery,
  OrganizationSchema,
} from '@app/generated/valhalla.gql';

import { ApolloClient } from '@apollo/client';
import { Environment } from '@app/env';
import { IncomingHttpHeaders } from 'http';
import { TemporaryApolloClient } from '@app/apollo/temp.client';

/**
 * Find organization from slug
 */
export async function getOrganizationBySlug(
  slug: OrganizationSchema['slug'],
  options?: {
    headers?: IncomingHttpHeaders;
    client?: ApolloClient<unknown>;
    silentFail?: boolean;
  },
) {
  const client =
    options?.client ??
    new TemporaryApolloClient({
      uri: Environment.GQL_SERVER,
      headers: options?.headers,
    });

  const result = await client.query<FindOrganizationBySlugQuery>({
    query: FindOrganizationBySlugDocument,
    errorPolicy: 'none',
    variables: { slug },
  });

  if (!result.data || result.error) {
    return null;
  }

  return result.data.organizationBySlug;
}
