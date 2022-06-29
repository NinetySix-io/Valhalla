import { useRouter } from 'next/router';

/**
 * It returns the organization slug from the URL
 */
export function useOrgQuery() {
  const router = useRouter();
  const orgSlug = router.query.organization;
  return Array.isArray(orgSlug) ? orgSlug[0] : orgSlug;
}
