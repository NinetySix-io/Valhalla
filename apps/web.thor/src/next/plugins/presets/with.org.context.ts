import type { FindOrganizationBySlugQuery } from '@app/generated/valhalla.gql';
import { FindOrganizationBySlugDocument } from '@app/generated/valhalla.gql';

import type { ApolloClient } from '@apollo/client';
import { NextPluginError } from '../errors';
import { createNextPlugin } from '../create.plugin';
import { tryNice } from 'try-nice';
import type { GlobalStore } from './with.global.store';

/**
 * Plugin to hydrate organization from params
 */
export const withOrgContext = createNextPlugin<
  {
    globalStore: GlobalStore;
    apolloClient?: ApolloClient<unknown>;
    organization: FindOrganizationBySlugQuery['organizationBySlug'];
  },
  { organization?: string }
>(async (ctx) => {
  if (!ctx.params.organization) {
    throw new NextPluginError('Organization param does not exist!');
  }

  const [result] = await tryNice(() =>
    ctx.apolloClient.query<FindOrganizationBySlugQuery>({
      query: FindOrganizationBySlugDocument,
      fetchPolicy: 'no-cache',
      variables: {
        slug: ctx.params.organization,
      },
    }),
  );

  if (!result?.data) {
    ctx.redirect = {
      permanent: false,
      destination: '/404',
    };

    return ctx;
  }

  ctx.organization = result.data.organizationBySlug;
  ctx.globalStore.actions.Tenant.setOrganization(ctx.organization);
  return ctx;
});
