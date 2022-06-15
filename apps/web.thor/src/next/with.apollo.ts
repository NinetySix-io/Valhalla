import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { ApolloClient } from '@apollo/client';
import { MetaSlice } from '@app/redux/slices/meta';
import { Store } from 'redux';
import { createApolloClient } from '@app/apollo/create.client';
import { getAccessToken } from '../lib/access.token/get.access.token';

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
    },
  ) => {
    const reqHeaders = ctx.req.headers as Record<string, string>;
    const accessToken = options?.requiredAuth
      ? await getAccessToken({ headers: reqHeaders })
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

    const page = await cb(ctx);
    page['props']['apolloState'] = ctx.gqlClient.cache.extract();
    return page;
  };
}
