import { ApolloClient } from '@apollo/client';
import { BasicObject } from '@valhalla/utilities';
import { GetServerSideProps } from './types';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { ParsedUrlQuery } from 'querystring';
import { PreviewData } from 'next';
import { Store } from '@app/redux';
import { buildReturnableLink } from '../lib/router.utils';
import { getAccessToken } from '../lib/access.token/get.access.token';
import { getOrganizationBySlug } from '@app/lib/organization/get.org.by.slug';
import { isRefreshTokenExpiredError } from '@app/apollo/utilities';
import { tryNice } from 'try-nice';
import { withRedux } from './with.redux';
import { withSsrApolloClient } from './with.apollo';

type CB<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = GetServerSideProps<
  P,
  Q,
  D,
  {
    store: Store;
    gqlClient: ApolloClient<unknown>;
    organization?: Awaited<ReturnType<typeof getOrganizationBySlug>>;
  }
>;

export function withAuthSsrContext<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
>(cb: CB<P, Q, D>) {
  return withRedux(async (ctx) => {
    try {
      return await withSsrApolloClient(
        { requiredAuth: true },
        async (context: Parameters<typeof cb>[0]) => await cb(context),
      )(ctx);
    } catch (error) {
      if (isRefreshTokenExpiredError(error)) {
        return {
          redirect: {
            permanent: false,
            destination: buildReturnableLink(PAGES.AUTH, ctx.req.url),
          },
        };
      } else {
        throw error;
      }
    }
  });
}

export function withPublicSsrContext<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
>(cb: CB<P, Q, D>) {
  return withRedux(
    withSsrApolloClient(
      { requiredAuth: false },
      async (context: Parameters<typeof cb>[0]) => {
        const [access] = await tryNice(() =>
          getAccessToken({
            client: context.gqlClient,
            headers: context.req.headers,
          }),
        );

        if (access) {
          return {
            redirect: {
              permanent: false,
              destination: PAGES.HOME,
            },
          };
        }

        return await cb(context);
      },
    ),
  );
}
