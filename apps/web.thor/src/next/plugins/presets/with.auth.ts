import {
  SSO_CALLBACK,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import { createNextPlugin } from '../create.plugin';

/**
 A plugin that is used to redirect to SSO login page if the user is not logged in
 */
export const withAuth = createNextPlugin<unknown, { organization?: string }>(
  (ctx) => {
    if (!ctx.isSsr) {
      throw new Error('[withAuth] can only be initialized from SSR');
    }

    const ssrCtx = ctx.ssrCtx;
    let reqUrl = ssrCtx.req.url;

    /**
     * This is when frontend is routed using next/link
     * Probably should find a better solution
     */
    if (ssrCtx.req.url.startsWith('/_next')) {
      reqUrl = ssrCtx.resolvedUrl.replace(/^\/root/g, '');
    }

    const reqOrg = ssrCtx.params?.organization;
    const refreshToken = ssrCtx.req.cookies[REFRESH_TOKEN_KEY];

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
