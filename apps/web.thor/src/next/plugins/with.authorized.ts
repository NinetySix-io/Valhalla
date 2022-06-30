import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import { createSsrPlugin } from './create.plugin';

export const withAuthorizedRedirect = createSsrPlugin((ctx) => {
  if (ctx.req.cookies[REFRESH_TOKEN_KEY]) {
    const query = ctx.query as Record<string, string>;
    const params = new URLSearchParams(query);

    ctx.redirect = {
      destination: `/api/auth/redirect?${params.toString()}`,
      permanent: false,
    };
  }

  return ctx;
});
