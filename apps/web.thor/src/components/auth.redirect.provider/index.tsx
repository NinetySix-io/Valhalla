import * as React from 'react';

import {
  SSO_CALLBACK,
  makeSSORedirectUrl,
} from '@app/lib/router.utils/sso.redirect';

import { Environment } from '@app/env';
import { MetaStore } from '@app/global.store/meta';
import { useOrgQuery } from '@app/hooks/hydrate/use.org.hydrate';
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
  const redirected = React.useRef(false);
  const shouldRedirect = MetaStore.useSelect((state) => state.requireAuth);

  if (
    !Environment.isServer &&
    isProtected &&
    !redirected.current &&
    shouldRedirect
  ) {
    redirected.current = true;
    router.push(
      makeSSORedirectUrl({
        tenant,
        returningUrl: location.pathname + location.search,
        callbackUrl: SSO_CALLBACK,
      }),
    );
  }

  return children as React.ReactElement;
};
