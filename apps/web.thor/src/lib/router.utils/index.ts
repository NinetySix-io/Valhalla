import { Environment } from '@app/env';
import { PAGES } from '@app/PAGES_CONSTANTS';
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
    returnToLink: returnTo,
  };
}

/**
 * It takes a URL and appends a query parameter to it
 * @param {string} nextPath - The path to the next page.
 * @param {string} originalPath - The path that the user was on before they were redirected to the
 * login page.
 * @returns A string
 */
export function buildReturnableLink(nextPath: string, originalPath: string) {
  const [path, query] = nextPath.split('?');
  const params = new URLSearchParams(query);
  if (!Object.values(PAGES).includes(originalPath)) {
    return path;
  }

  params.append(RETURN_TO, originalPath);
  return `${path}?${params.toString()}`;
}

/**
 * It takes a URL and returns a URL that will return the user to the current page when they click on it
 * @param {T} url - The url to build the link to.
 * @returns A function that takes a string and returns a string.
 */
export function buildClientReturnableLink<T extends string>(url: T) {
  return buildReturnableLink(
    url,
    Environment.isServer ? PAGES.HOME : window.location.pathname,
  );
}
