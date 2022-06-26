import { ApolloClient } from '@apollo/client';
import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Store } from '@app/redux';
import { buildReturnableLink } from '@app/lib/router.utils';
import { createApolloClient } from '@app/apollo/create.client';
import { createSsrPlugin } from './create.plugin';
import { getAccessToken } from '@app/lib/access.token';
import { tryNice } from 'try-nice';

export const withProtectedApollo = createSsrPlugin<{
  apolloClient: ApolloClient<unknown>;
  reduxStore?: Store;
}>(async (ctx) => {
  const headers = ctx.req.headers as Record<string, string>;
  const [accessToken, error] = await tryNice(() => getAccessToken({ headers }));

  //TODO: handle other error
  if (error) {
    console.log({
      return: buildReturnableLink(PAGES.AUTH, ctx.req.url),
    });

    ctx.redirect = {
      permanent: false,
      destination: buildReturnableLink(PAGES.AUTH, ctx.req.url),
    };

    return ctx;
  }

  const authorization = accessToken?.token || headers.authorization;
  const apolloClient = createApolloClient({
    headers: {
      ...headers,
      authorization,
    },
  });

  if (ctx.reduxStore && accessToken) {
    ctx.reduxStore.dispatch(
      MetaSlice.actions.setAccessToken({
        accessToken: authorization,
        accessTokenExpires: accessToken.expiresAt,
      }),
    );
  }

  ctx.apolloClient = apolloClient;
  ctx.onPageProps(() => ({
    apolloState: apolloClient.cache.extract(),
  }));

  return ctx;
});
