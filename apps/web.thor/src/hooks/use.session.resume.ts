import * as React from 'react';

import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import {
  GetAccessTokenDocument,
  GetAccessTokenQuery,
} from '@app/graphql/valhalla/generated.gql';
import { useReduxDispatch, useReduxSelector } from '@app/redux/hooks';

import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { noop } from '@valhalla/utilities';
import { useRouter } from 'next/router';

export function useSessionResume() {
  const accessToken = useReduxSelector((state) => state.meta.accessToken);
  const client = useApolloClient();
  const router = useRouter();
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      client
        .query<GetAccessTokenQuery>({ query: GetAccessTokenDocument })
        .catch(noop)
        .then((result: ApolloQueryResult<GetAccessTokenQuery>) => {
          const nextAccessToken = result.data.accessToken;
          dispatch(
            MetaSlice.actions.setAccessToken({
              accessToken: nextAccessToken.token,
              accessTokenExpires: nextAccessToken.expiresAt,
            }),
          );

          router.push({ pathname: PAGES.ME });
        });
    }
  }, [accessToken, client, router, dispatch]);
}
