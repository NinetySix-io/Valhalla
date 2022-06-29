import * as React from 'react';

import {
  SSO_CALLBACK,
  SSO_REDIRECT_ROOT,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { Environment } from '@app/env';
import { useOrgQuery } from '@app/hooks/use.org.query';
import { useReduxSelector } from '@app/redux/hooks';
import { useRouter } from 'next/router';

type Props = {
  isProtected?: boolean;
  children?: React.ReactNode;
};

export const AuthRedirectProvider: React.FC<Props> = ({
  isProtected,
  children,
}) => {
  const router = useRouter();
  const tenant = useOrgQuery();
  const shouldRedirect = useReduxSelector(
    (state) => state.meta.requireAuth && !Environment.isServer,
  );

  if (isProtected && shouldRedirect) {
    const url = makeSSORedirectUrl({
      tenant: tenant || SSO_REDIRECT_ROOT,
      returningUrl: location.pathname + location.search,
      callbackUrl: SSO_CALLBACK,
    });

    router.push(url);
  }

  return <>{children}</>;
};
