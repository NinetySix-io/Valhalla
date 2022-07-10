import { getSingleUse } from '@app/lib/get.single.use';
import { useRouter } from 'next/router';

/**
 * Get value of a single query parameter from the URL, or undefined if the
 * query parameter is not present.
 */
export function useSingleRouterQuery(key: string): string | undefined {
  const router = useRouter();
  return getSingleUse(router.query[key]);
}
