import { NextApiRequest, NextApiResponse } from 'next';
import {
  SSO_REDIRECT_RETURN,
  SSO_REFRESH_TOKEN,
} from '@app/lib/router.utils/sso.redirect';

import { Environment } from '@app/env';
import { REFRESH_TOKEN_KEY } from '@app/lib/access.token';
import cookies from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const returnUrl = req.query[SSO_REDIRECT_RETURN] as string;
  const refreshToken = req.query[SSO_REFRESH_TOKEN] as string;

  if (!refreshToken) {
    return res.status(404).json({ message: 'Error!' });
  } else if (!returnUrl) {
    return res.status(500).json({ message: 'Error!' });
  }

  if (req.cookies[REFRESH_TOKEN_KEY] !== refreshToken) {
    const cookieContent = cookies.serialize(REFRESH_TOKEN_KEY, refreshToken, {
      path: '/',
      secure: true,
      httpOnly: !Environment.isDev,
    });

    res.setHeader('set-cookie', cookieContent);
  }

  return res.redirect(returnUrl);
}
