import { parseCookies, setCookie } from 'nookies';

import { ACCESS_TOKEN_KEY } from './constants';
import React from 'react';
import { useReduxSelector } from '@app/redux/hooks';

export function useAccessTokenSync() {
  const accessToken = useReduxSelector((state) => state.meta.accessToken);
  const accessTokenExpires = useReduxSelector(
    (state) => state.meta.accessTokenExpires,
  );

  React.useEffect(() => {
    const cookies = parseCookies();
    const currentToken = cookies[ACCESS_TOKEN_KEY];
    if (accessToken && accessTokenExpires && accessToken !== currentToken) {
      setCookie(null, ACCESS_TOKEN_KEY, accessToken, {
        domain: location.hostname,
        secure: true,
        sameSite: 'strict',
        expires: accessTokenExpires,
      });
    }
  }, [accessToken, accessTokenExpires]);
}
