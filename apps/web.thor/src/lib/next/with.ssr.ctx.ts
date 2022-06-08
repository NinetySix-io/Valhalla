import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';

import { ACCESS_TOKEN_KEY } from '../access.token/constants';
import { BasicObject } from '@valhalla/utilities';
import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { ParsedUrlQuery } from 'querystring';
import { Store } from '@app/redux';
import { WithSEO } from '@valhalla/react';
import { buildReturnableLink } from '../router.utils';
import { createApolloClient } from '@app/apollo/create.client';
import { isRefreshTokenExpiredError } from '@app/apollo/utilities';
import nookies from 'nookies';
import { tryNice } from 'try-nice';
import { withSsrRedux } from '@app/redux/with.redux';

type GqlClient = ReturnType<typeof createApolloClient>;
type GetServerSideProps<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
  C extends BasicObject = BasicObject,
> = (
  context: GetServerSidePropsContext<Q, D> & C,
) =>
  | Promise<GetServerSidePropsResult<WithSEO<P>>>
  | GetServerSidePropsResult<WithSEO<P>>;

function withRedux(cb: GetServerSideProps) {
  return withSsrRedux(
    (store) => async (ctx: GetServerSidePropsContext & { store: Store }) => {
      ctx.store = store;
      return cb(ctx);
    },
  );
}

export function withSsrApolloClient(cb: GetServerSideProps) {
  return async (
    ctx: GetServerSidePropsContext & {
      store?: Store;
      gqlClient: GqlClient;
    },
  ) => {
    const cookies = nookies.get(ctx);
    const accessToken = cookies[ACCESS_TOKEN_KEY];
    const reqHeaders = ctx.req.headers as Record<string, string>;

    ctx.gqlClient =
      ctx.gqlClient ??
      createApolloClient({
        onAccessToken: (accessToken) => {
          ctx.store?.dispatch(
            MetaSlice.actions.setAccessToken({
              accessToken: accessToken.token,
              accessTokenExpires: accessToken.expiresAt,
            }),
          );
        },
        headers: {
          ...reqHeaders,
          authorization: accessToken,
        },
      });

    const [page, error] = await tryNice(() => cb(ctx));
    if (isRefreshTokenExpiredError(error)) {
      return {
        redirect: {
          permanent: false,
          destination: buildReturnableLink(PAGES.GET_STARTED, ctx.req.url),
        },
      };
    }

    page['props']['apolloState'] = ctx.gqlClient.cache.extract();
    return page;
  };
}

export function withSsrContext<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
>(
  cb: GetServerSideProps<
    P,
    Q,
    D,
    {
      store: Store;
      gqlClient: GqlClient;
    }
  >,
) {
  return withRedux(
    withSsrApolloClient((context: Parameters<typeof cb>[0]) => cb(context)),
  );
}
