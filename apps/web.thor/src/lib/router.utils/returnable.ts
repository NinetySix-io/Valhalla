import { Environment } from '@app/env';
import type { UrlObject } from 'url';

export const RETURN_TO = 'return_to' as const;

/**
 * It takes a path and an optional query object, and returns a URL object that can be used with the
 * `next/link` component
 */
export function buildReturnableUrl<Q extends object>(
  nextPath: string,
  options?: {
    query?: Q;
    withCurrentPath?: true;
  },
): UrlObject {
  const params = new URLSearchParams(options?.query ?? {});

  if (!Environment.isServer && options?.withCurrentPath) {
    params.append(RETURN_TO, location.pathname);
  }

  return {
    pathname: nextPath,
    search: params.toString(),
  };
}
