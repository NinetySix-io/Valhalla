import {
  SSO_CALLBACK,
  SSO_REDIRECT_ROOT,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { ApolloClient } from '@apollo/client';
import { Store } from '@app/redux';
import { createApolloClient } from '@app/apollo/create.client';
import { createSsrPlugin } from './create.plugin';
import { getAccessToken } from '@app/lib/access.token';
import { getOrganizationBySlug } from '@app/lib/organization/get.org.by.slug';
import { tryNice } from 'try-nice';

export const withApollo = (options?: { protected?: true }) =>
  createSsrPlugin<
    {
      apolloClient: ApolloClient<unknown>;
      reduxStore?: Store;
    },
    { organization?: string }
  >(async (ctx) => {
    const reqOrg = ctx.params.organization;
    const organization = reqOrg
      ? await getOrganizationBySlug(reqOrg)
      : undefined;

    const headers = ctx.req.headers as Record<string, string>;
    const [accessToken, error] = await tryNice(() =>
      !options?.protected
        ? undefined
        : getAccessToken({
            headers,
            organization: organization.id,
          }),
    );

    if (error) {
      ctx.redirect = {
        permanent: false,
        destination: makeSSORedirectUrl({
          tenant: reqOrg || SSO_REDIRECT_ROOT,
          returningUrl: ctx.req.url,
          callbackUrl: SSO_CALLBACK,
        }),
      };

      return ctx;
    }

    const authorization = accessToken?.value || headers.authorization;
    const apolloClient = createApolloClient({
      headers: {
        ...headers,
        authorization,
      },
    });

    ctx.apolloClient = apolloClient;
    ctx.onPageProps(() => ({ apolloState: apolloClient.cache.extract() }));

    return ctx;
  });
