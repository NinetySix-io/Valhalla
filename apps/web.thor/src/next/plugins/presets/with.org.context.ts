import type { FindOrganizationBySlugQuery } from '@app/generated/valhalla.gql';
import { FindOrganizationBySlugDocument } from '@app/generated/valhalla.gql';

import type { ApolloClient } from '@apollo/client';
import { tryNice } from 'try-nice';
import { createNextPlugin } from '../create.plugin';
import { NextPluginError } from '../errors';
import { NOT_FOUND } from '@app/PAGES_CONSTANTS';

export const ORG_CONTEXT_KEY = '__ORG_CONTEXT__' as const;

/**
 * Plugin to hydrate organization from params
 */
export const withOrgContext = createNextPlugin<
  {
    apolloClient?: ApolloClient<unknown>;
    organization: FindOrganizationBySlugQuery['organizationBySlug'];
  },
  { organization?: string }
>(async (ctx) => {
  if (!ctx.params.organization) {
    throw new NextPluginError('Organization param does not exist!');
  } else if (!ctx.apolloClient) {
    throw new NextPluginError('Apollo client not found!');
  }

  const [result] = await tryNice(() =>
    ctx.apolloClient.query<FindOrganizationBySlugQuery>({
      query: FindOrganizationBySlugDocument,
      variables: {
        slug: ctx.params.organization,
      },
    }),
  );

  if (!result?.data) {
    ctx.redirect = {
      permanent: false,
      destination: NOT_FOUND,
    };

    return ctx;
  }

  ctx.organization = result.data.organizationBySlug;
  ctx.onPageProps(() => ({
    [ORG_CONTEXT_KEY]: ctx.organization,
  }));

  return ctx;
});
