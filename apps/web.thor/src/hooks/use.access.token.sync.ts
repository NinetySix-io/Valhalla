import { parseCookies, setCookie } from 'nookies';
import { useReduxDispatch, useReduxSelector } from '@app/redux/hooks';

import { ACCESS_TOKEN_KEY } from '../lib/access.token/constants';
import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import React from 'react';
import { buildClientReturnableLink } from '../lib/router.utils';
import { getAccessToken } from '../lib/access.token/get.access.token';
import moment from 'moment';
import { tryNice } from 'try-nice';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

/**
 * It syncs the access token
 * and refresh it when necessary possible
 */
export function useAccessTokenSync() {
  const router = useRouter();
  const client = useApolloClient();
  const dispatch = useReduxDispatch();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const accessToken = useReduxSelector((state) => state.meta.accessToken);
  const accessTokenExpires = useReduxSelector(
    (state) => state.meta.accessTokenExpires,
  );

  React.useEffect(() => {
    if (accessTokenExpires) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const timeoutDur = moment
        .duration(moment(accessTokenExpires).diff(new Date()))
        .subtract(2, 'minutes');

      const timeoutId = setTimeout(async () => {
        const [nextToken] = await tryNice(() =>
          getAccessToken({
            client,
          }),
        );

        if (nextToken) {
          dispatch(
            MetaSlice.actions.setAccessToken({
              accessToken: nextToken.token,
              accessTokenExpires: moment(nextToken.expiresAt).toDate(),
            }),
          );
        } else {
          router.push(buildClientReturnableLink(PAGES.AUTH));
        }
      }, Math.abs(timeoutDur.asMilliseconds()));

      timeoutRef.current = timeoutId;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [accessTokenExpires, router, client, dispatch]);

  React.useEffect(() => {
    const cookies = parseCookies();
    const currentToken = cookies[ACCESS_TOKEN_KEY];

    if (accessToken && accessTokenExpires && accessToken !== currentToken) {
      setCookie(null, ACCESS_TOKEN_KEY, accessToken, {
        domain: location.hostname,
        secure: true,
        sameSite: 'strict',
        expires: accessTokenExpires
          ? moment(accessTokenExpires).toDate()
          : undefined,
      });
    }
  }, [accessToken, accessTokenExpires]);
}
