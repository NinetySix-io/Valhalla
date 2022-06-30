import * as React from 'react';

import {
  SSO_CALLBACK,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { Environment } from '@app/env';
import { useOrgQuery } from '@app/hooks/use.org.query';
import { useReduxSelector } from '@app/redux/hooks';

type Props = {
  isProtected?: boolean;
  children?: React.ReactNode;
};

export const AuthRedirectProvider: React.FC<Props> = ({
  isProtected,
  children,
}) => {
  const tenant = useOrgQuery();
  const redirected = React.useRef(false);
  const shouldRedirect = useReduxSelector(
    (state) => state.meta.requireAuth && !Environment.isServer,
  );

  if (
    !Environment.isServer &&
    isProtected &&
    !redirected.current &&
    shouldRedirect
  ) {
    redirected.current = true;
    location.href = makeSSORedirectUrl({
      tenant,
      returningUrl: location.pathname + location.search,
      callbackUrl: SSO_CALLBACK,
    });
  }

  return children as React.ReactElement;
};
