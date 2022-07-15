import { useGetSiteQuery } from '@app/generated/valhalla.gql';
import { useSingleRouterQuery } from '../use.single.router.query';

/**
 * It returns the siteId from the URL query string
 * @returns A string or undefined
 */
export function useSiteId() {
  return useSingleRouterQuery('siteId');
}

/**
 * It returns the site data for the current site
 * @returns The site object
 */
export function useSiteHydrate() {
  const siteId = useSiteId();
  const { loading, refetch, data, error, called } = useGetSiteQuery({
    variables: {
      siteId,
    },
  });

  return {
    called,
    error,
    loading,
    refetch,
    data: data?.site,
  };
}
