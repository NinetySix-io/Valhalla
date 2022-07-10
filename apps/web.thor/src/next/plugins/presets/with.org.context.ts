import {
  FindOrganizationBySlugDocument,
  FindOrganizationBySlugQuery,
} from '@app/generated/valhalla.gql';

import { ApolloClient } from '@apollo/client';
import { NextPluginError } from '../errors';
import { Store } from '@app/redux';
import { TenantSlice } from '@app/redux/slices/tenant';
import { createNextPlugin } from '../create.plugin';
import { tryNice } from 'try-nice';

/**
 * Plugin to hydrate organization from params
 */
export const withOrgContext = createNextPlugin<
  {
    reduxStore?: Store;
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
  ctx.reduxStore?.dispatch(
    TenantSlice.actions.setOrganization(ctx.organization),
  );

  return ctx;
});
