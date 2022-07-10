import { useGetOrgMembershipQuery } from '@app/generated/valhalla.gql';
import { useReduxSelector } from '@app/redux/hooks';
import { useSingleRouterQuery } from '../use.single.router.query';

/**
 * It returns the organization slug from the URL
 */
export function useOrgQuery() {
  return useSingleRouterQuery('organization');
}

/**
 * Hook to get current user org memberships
 */
export function useOrgMembershipHydrate() {
  const { loading, refetch, data } = useGetOrgMembershipQuery();

  return {
    loading,
    refetch,
    data: data?.organizationMembership,
  };
}

/**
 * Hook to get organization context
 */
export function useOrgCtx() {
  return useReduxSelector((state) => state.Tenant.organization);
}
