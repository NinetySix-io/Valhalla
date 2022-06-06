import { Environment } from '@app/env';
import { useRouter } from 'next/router';

const RETURN_TO = 'returnTo';

/**
 * It returns true if the current URL has a query parameter called `returnTo`
 * @returns A function that returns a boolean value.
 */
export function canGoBack() {
  if (Environment.isServer) {
    return false;
  }

  const [, queryStr] = window.location.search.split('?');
  const query = new URLSearchParams(queryStr);
  return query.has(RETURN_TO);
}

/**
 * It returns an object with two properties: `canGoBack` and `goBack`
 * @returns An object with two properties: canGoBack and goBack.
 */
export function useRouterBack() {
  const router = useRouter();
  const query = router.query;
  const returnTo = query[RETURN_TO] as string;
  const canGoBack = Boolean(returnTo);

  function goBack() {
    router.push(returnTo);
  }

  return {
    canGoBack,
    goBack,
  };
}

/**
 * It takes a URL, appends the current page's path to it, and returns the new URL
 * @param {T} url - The URL to build a returnable link for.
 * @returns A function that takes a string and returns a string.
 */
export function buildReturnableLink<T extends string>(url: T) {
  if (Environment.isServer) {
    return url;
  }

  const [path, query] = url.split('?');
  const params = new URLSearchParams(query);
  params.append(RETURN_TO, window.location.pathname);
  return `${path}?${params.toString()}`;
}
