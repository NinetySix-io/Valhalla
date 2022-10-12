import { TenantStore } from '@app/global.store/tenant';
import { useGetOrgMembershipQuery } from '@app/generated/valhalla.gql';
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
    data: data?.organizationMembershipProfile,
  };
}

/**
 * Hook to get organization context
 */
export function useOrgCtx() {
  return TenantStore.useSelect((state) => state.organization);
}
