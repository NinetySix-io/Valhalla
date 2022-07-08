import { ApolloClient } from '@apollo/client';
import { FindOrganizationBySlugQuery } from '@app/generated/valhalla.gql';
import { NextPluginError } from '../errors';
import { Store } from '@app/redux';
import { TenantSlice } from '@app/redux/slices/tenant';
import { createNextPlugin } from '../create.plugin';
import { getOrganizationBySlug } from '@app/graphql/valhalla/utils/get.org.by.slug';

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

  const org = await getOrganizationBySlug(ctx.params.organization, {
    client: ctx.apolloClient,
    silentFail: true,
  });

  if (!org) {
    ctx.redirect = {
      permanent: false,
      destination: '/404',
    };

    return ctx;
  }

  ctx.organization = org;
  ctx.reduxStore?.dispatch(TenantSlice.actions.setOrganization(org));

  return ctx;
});
