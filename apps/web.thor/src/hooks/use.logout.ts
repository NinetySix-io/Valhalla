import { ACCESS_TOKEN_KEY } from '@app/lib/access.token';
import { PAGES } from '@app/PAGES_CONSTANTS';
import cookies from 'js-cookie';
import { useLogoutMutation } from '@app/generated/valhalla.gql';
import { useRouter } from 'next/router';

/**
 * Hook to handle user logout
 */
export function useLogout() {
  const [logout, { loading }] = useLogoutMutation();
  const router = useRouter();

  async function handleLogout() {
    await Promise.all([logout(), cookies.remove(ACCESS_TOKEN_KEY)]);
    router.push(PAGES.HOME);
  }

  return {
    execute: handleLogout,
    loading,
  };
}
