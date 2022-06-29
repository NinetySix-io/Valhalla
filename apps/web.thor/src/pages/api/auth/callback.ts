import { NextApiRequest, NextApiResponse } from 'next';
import {
  SSO_REDIRECT_RETURN,
  SSO_REFRESH_TOKEN,
} from '@app/lib/router.utils/sso.redirect';

import { CookiesJar } from '@app/lib/cookies.jar';
import { Environment } from '@app/env';
import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const returnUrl = req.query[SSO_REDIRECT_RETURN] as string;
  const refreshToken = req.query[SSO_REFRESH_TOKEN] as string;

  if (!refreshToken) {
    return res.status(404).json({ message: 'Error!' });
  } else if (!returnUrl) {
    return res.status(500).json({ message: 'Error!' });
  }

  res.setHeader(
    'set-cookie',
    CookiesJar.buildCookie({
      name: REFRESH_TOKEN_KEY,
      value: refreshToken,
      path: '/',
      secure: true,
      httpOnly: !Environment.isDev,
    }),
  );

  return res.redirect(returnUrl);
}
