import { useGetPageQuery } from '@app/generated/valhalla.gql';
import { useSingleRouterQuery } from '../use.single.router.query';
import { useSiteId } from './use.site.hydrate';

/**
 * Get `pageId` query from router
 */
export function useSitePageQuery() {
  return useSingleRouterQuery('pageId');
}

/**
 * Get page data from router query
 */
export function useSitePageHydrate() {
  const pageId = useSitePageQuery();
  const siteId = useSiteId();
  const { loading, refetch, data, error } = useGetPageQuery({
    variables: {
      pageId,
      siteId,
    },
  });

  return {
    error,
    loading,
    data: data?.page,
    refetch,
  };
}
