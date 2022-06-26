import { AppPages } from '@app/PAGES_CONSTANTS';
import { UrlObject } from 'url';
import { buildClientReturnableLink } from '@app/lib/router.utils';
import { useIsMounted } from './use.is.mounted';

/**
 * UseReturnableLink() returns a function that returns a link to a page if the component is mounted,
 * otherwise it returns the page name.
 * @returns A function that returns a string.
 */
export function useReturnableLink() {
  const isMounted = useIsMounted()();

  function returnTo(path: AppPages): string | UrlObject {
    return isMounted ? buildClientReturnableLink(path) : path;
  }

  return returnTo;
}
