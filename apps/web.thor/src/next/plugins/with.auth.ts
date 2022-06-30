import {
  SSO_CALLBACK,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import { createSsrPlugin } from './create.plugin';

export const withAuth = createSsrPlugin<unknown, { organization?: string }>(
  (ctx) => {
    let reqUrl = ctx.req.url;

    /**
     * This is when frontend is routed using next/link
     * Probably should find a better solution
     */
    if (ctx.req.url.startsWith('/_next')) {
      reqUrl = ctx.resolvedUrl.replace(/^\/root/g, '');
    }

    const reqOrg = ctx.params?.organization;
    const refreshToken = ctx.req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      ctx.redirect = {
        permanent: false,
        destination: makeSSORedirectUrl({
          tenant: reqOrg,
          returningUrl: reqUrl,
          callbackUrl: SSO_CALLBACK,
        }),
      };
    }

    return ctx;
  },
);
