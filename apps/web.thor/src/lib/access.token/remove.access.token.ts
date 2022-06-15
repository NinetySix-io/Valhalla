import { ACCESS_TOKEN_KEY } from './constants';
import { destroyCookie } from 'nookies';

/**
 * It removes the access token from the cookie
 */
export function removeAccessToken() {
  destroyCookie(null, ACCESS_TOKEN_KEY);
}
