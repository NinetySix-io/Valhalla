import { ApolloClient } from '@apollo/client';
import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Store } from '@app/redux';
import { buildReturnableLink } from '@app/lib/router.utils';
import { createApolloClient } from '@app/apollo/create.client';
import { createSsrPlugin } from './create.plugin';
import { getAccessToken } from '@app/lib/access.token';
import { getOrganizationBySlug } from '@app/lib/organization/get.org.by.slug';
import { tryNice } from 'try-nice';

export const withProtectedApollo = createSsrPlugin<
  {
    apolloClient: ApolloClient<unknown>;
    reduxStore?: Store;
  },
  { organization?: string }
>(async (ctx) => {
  const headers = ctx.req.headers as Record<string, string>;
  const organizationParam = ctx.query.organization as string;
  const organization = organizationParam
    ? await getOrganizationBySlug(organizationParam, { silentFail: true })
    : undefined;

  const [accessToken, error] = await tryNice(() =>
    getAccessToken({
      headers,
      organization: organization?.id,
    }),
  );

  //TODO: handle other error
  if (error) {
    if (organizationParam) {
      ctx.redirect = {
        permanent: false,
        destination: `http://localhost:3005/${buildReturnableLink(
          PAGES.AUTH,
          ctx.req.url,
          false,
        )}`,
      };
    } else {
      ctx.redirect = {
        permanent: false,
        destination: buildReturnableLink(PAGES.AUTH, ctx.req.url, false),
      };
    }

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
