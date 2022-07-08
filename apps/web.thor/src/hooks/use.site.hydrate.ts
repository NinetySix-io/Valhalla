import { useGetSiteByIdQuery } from '@app/generated/valhalla.gql';
import { useRouter } from 'next/router';

/**
 * It returns the siteId from the URL query string
 * @returns A string or undefined
 */
export function useSiteId(): string | undefined {
  const router = useRouter();
  return Array.isArray(router.query.siteId)
    ? router.query.siteId[0]
    : router.query.siteId;
}

/**
 * It returns the site data for the current site
 * @returns The site object
 */
export function useSiteHydrate() {
  const siteId = useSiteId();
  const { loading, refetch, data } = useGetSiteByIdQuery({
    variables: {
      siteId,
    },
  });

  return {
    loading,
    refetch,
    data: data?.getSite,
  };
}
