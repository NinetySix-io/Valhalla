import { useGetOrgMembershipQuery } from '@app/graphql/valhalla/generated.gql';

/**
 * Initial fetches & checks for org page
 */
export function useTenantHydrate() {
  const membership = useGetOrgMembershipQuery({
    fetchPolicy: 'cache-first',
  });

  return Boolean(membership.data?.organizationMembership);
}
