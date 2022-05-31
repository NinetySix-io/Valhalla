import { FastifyReply, FastifyRequest } from 'fastify';

import { CookiesJar } from './cookies.jar';
import { isDev } from '@valhalla/utilities';

export class AuthManager extends CookiesJar {
  private static readonly refreshTokenKey = 'x-valhalla-refresh-token' as const;
  private static readonly accessTokenKey = 'x-valhalla-access-token' as const;
  private reply: FastifyReply;
  private request: FastifyRequest;

  constructor(ctx: { reply: FastifyReply; request: FastifyRequest }) {
    super();
    this.reply = ctx.reply;
    this.request = ctx.request;
  }

  /**
   * It returns the access token from the request
   * @param request - FastifyRequest<object>
   * @returns The access token from the request.
   */
  static getAccessTokenFromRequest(request: FastifyRequest<object>) {
    return (
      request.headers[this.accessTokenKey] ||
      request.headers['authorization'] ||
      (typeof request.query === 'object'
        ? (request.query as Record<string, string>)['token']
        : undefined)
    );
  }

  /**
   * It sets the refresh token in the cookie
   * @param {string} token - The token to set
   */
  setRefreshToken(token: string) {
    const cookie = isDev()
      ? AuthManager.buildCookie({
          name: AuthManager.refreshTokenKey,
          value: token,
          secure: false,
          httpOnly: false,
          domain: 'localhost',
        })
      : AuthManager.buildCookie({
          name: AuthManager.refreshTokenKey,
          value: token,
          secure: true,
          httpOnly: true,
        });

    this.reply.header('Set-Cookie', cookie);
  }

  /**
   * It takes a string of cookies, splits them into an array, and then returns an object with the
   * cookie names as keys and the cookie values as values
   * @returns The cookies object is being returned.
   */
  get cookies() {
    const cookieStr = this.request.headers['cookie'];
    if (!cookieStr) {
      return undefined;
    }

    const cookies = AuthManager.parseCookie(cookieStr);
    return cookies;
  }

  /**
   * It gets the refresh token from the cookie
   * @returns The refresh token from the cookie.
   */
  getRefreshToken() {
    return this.cookies?.[AuthManager.refreshTokenKey];
  }

  /**
   * It returns the value of the access token key in the request header
   * @returns The access token from the request header.
   */
  getAccessToken() {
    return this.request.headers[AuthManager.accessTokenKey];
  }

  /**
   * It sets the access token in the response header
   * @param {string} accessToken - The access token to be set in the response header.
   */
  setAccessToken(accessToken: string) {
    this.reply.header(AuthManager.accessTokenKey, accessToken);
  }
}
