import type { NextApiRequest, NextApiResponse } from 'next';
import {
  SSO_REDIRECT_CALLBACK,
  SSO_REDIRECT_RETURN,
  SSO_REDIRECT_ROOT,
  SSO_REDIRECT_TENANT,
  SSO_REFRESH_TOKEN,
} from '@app/lib/router.utils/sso.redirect';

import { Environment } from '@app/env';
import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(401).end();
  }

  const tenant = req.query[SSO_REDIRECT_TENANT] as string;
  const returnUrl = req.query[SSO_REDIRECT_RETURN] as string;
  const callbackUrl = req.query[SSO_REDIRECT_CALLBACK] as string;

  if (!returnUrl && !callbackUrl) {
    return res.status(400).redirect('/');
  }

  const url =
    !tenant || tenant === SSO_REDIRECT_ROOT
      ? `${Environment.rootUrl}${callbackUrl}`
      : `${Environment.getTenantUrl(tenant)}${callbackUrl}`;

  const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
  if (!refreshToken) {
    return res.status(404).redirect('/');
  }

  const params = new URLSearchParams({
    [SSO_REFRESH_TOKEN]: refreshToken,
    [SSO_REDIRECT_RETURN]: returnUrl,
  });

  const redirectUrl = `${url}?${params.toString()}`;
  return res.status(200).redirect(redirectUrl);
}
