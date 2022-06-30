import { Environment } from '@app/env';

export const SSO_REDIRECT_ROOT = '.' as const;
export const SSO_REDIRECT_TENANT = '_tenant';
export const SSO_REDIRECT_RETURN = '_return';
export const SSO_REDIRECT_CALLBACK = '_callback';
export const SSO_REFRESH_TOKEN = '_x_token';
export const SSO_CALLBACK = '/api/auth/callback';

/**
 * It takes an application name, a request URL, and a callback URL, and returns a URL that will
 * redirect the user to the SSO login page, and then back to the request URL after they've logged in
 */
export function makeSSORedirectUrl(props: {
  tenant?: string;
  returningUrl: string;
  callbackUrl: string;
}) {
  const params = new URLSearchParams();
  if (props.tenant && props.tenant !== SSO_REDIRECT_ROOT) {
    params.append(SSO_REDIRECT_TENANT, props.tenant);
  }

  params.append(SSO_REDIRECT_RETURN, props.returningUrl);
  params.append(SSO_REDIRECT_CALLBACK, props.callbackUrl);
  return `${Environment.rootUrl}/auth?${params.toString()}`;
}
