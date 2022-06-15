import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { removeAccessToken } from '@app/lib/access.token';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '@app/graphql/valhalla/generated.gql';
import { useRouter } from 'next/router';

/**
 * Hook to handle user logout
 */
export function useLogout() {
  const [logout, { loading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await Promise.all([
      logout(),
      dispatch(MetaSlice.actions.clearAccessToken()),
    ]);

    removeAccessToken();
    router.push(PAGES.AUTH);
  }

  return {
    execute: handleLogout,
    loading,
  };
}
