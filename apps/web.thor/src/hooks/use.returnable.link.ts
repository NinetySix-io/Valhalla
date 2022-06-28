import { UrlObject } from 'url';
import { buildReturnableUrl } from '@app/lib/router.utils/returnable';
import { useIsMounted } from './use.is.mounted';

/**
 * UseReturnableLink() returns a function that returns a link to a page if the component is mounted,
 * otherwise it returns the page name.
 * @returns A function that returns a string.
 */
export function useReturnableLink() {
  const isMounted = useIsMounted()();

  function returnTo(
    ...[url, options]: Parameters<typeof buildReturnableUrl>
  ): string | UrlObject {
    return isMounted ? buildReturnableUrl(url, options) : url;
  }

  return returnTo;
}
