import { ACCESS_TOKEN_KEY } from './constants';
import React from 'react';
import cookie from 'js-cookie';
import { useReduxSelector } from '@app/redux/hooks';

export function useAccessTokenSync() {
  const accessToken = useReduxSelector((state) => state.meta.accessToken);
  const accessTokenExpires = useReduxSelector(
    (state) => state.meta.accessTokenExpires,
  );

  React.useEffect(() => {
    const currentToken = cookie.get(ACCESS_TOKEN_KEY);
    if (accessToken && accessTokenExpires && accessToken !== currentToken) {
      cookie.set(ACCESS_TOKEN_KEY, accessToken, {
        domain: location.hostname,
        secure: true,
        sameSite: 'strict',
        expires: accessTokenExpires,
      });
    }
  }, [accessToken, accessTokenExpires]);
}
