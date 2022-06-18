import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { ApolloClient } from '@apollo/client';
import { MetaSlice } from '@app/redux/slices/meta';
import { Store } from 'redux';
import { createApolloClient } from '@app/apollo/create.client';
import { getAccessToken } from '../lib/access.token/get.access.token';
import { getOrganizationBySlug } from '@app/lib/organization/get.org.by.slug';

export type WithSsrApolloClientOptions = {
  requiredAuth?: boolean;
};

export function withSsrApolloClient(
  options: null | WithSsrApolloClientOptions,
  cb: GetServerSideProps,
) {
  return async (
    ctx: GetServerSidePropsContext & {
      store?: Store;
      gqlClient?: ApolloClient<unknown>;
      organization?: Awaited<ReturnType<typeof getOrganizationBySlug>>;
    },
  ) => {
    const organization = !ctx.params.organization
      ? undefined
      : await getOrganizationBySlug(ctx.params.organization as string, {
          silentFail: true,
        });

    const reqHeaders = ctx.req.headers as Record<string, string>;
    const shouldGetToken = options?.requiredAuth;
    const accessToken = shouldGetToken
      ? await getAccessToken({
          headers: reqHeaders,
          organization: organization?.id,
        })
      : null;

    ctx.gqlClient =
      ctx?.gqlClient ??
      createApolloClient({
        headers: {
          ...reqHeaders,
          authorization: accessToken?.token || reqHeaders.authorization,
        },
      });

    if (accessToken) {
      ctx.store.dispatch(
        MetaSlice.actions.setAccessToken({
          accessToken: accessToken.token,
          accessTokenExpires: accessToken.expiresAt,
        }),
      );
    }

    if (organization) {
      ctx.organization = organization;
    }

    const page = await cb(ctx);
    if (page['props']) {
      page['props']['apolloState'] = ctx.gqlClient.cache.extract();
    }

    return page;
  };
}
