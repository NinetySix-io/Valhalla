import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import { createNextPlugin } from '../create.plugin';
import { guardServerOnly } from '@app/lib/router.utils/guard.server';

/**
 * A plugin that redirects to the login page if the user is not logged in
 */
export const withAuthorizedRedirect = createNextPlugin((ctx) => {
  guardServerOnly();

  const ssrCtx = ctx.ssrCtx;
  const refreshToken = ssrCtx.req.cookies[REFRESH_TOKEN_KEY];
  if (refreshToken) {
    const query = ssrCtx.query as Record<string, string>;
    const params = new URLSearchParams(query);

    ctx.redirect = {
      destination: `/api/auth/redirect?${params.toString()}`,
      permanent: false,
    };
  }

  return ctx;
});
