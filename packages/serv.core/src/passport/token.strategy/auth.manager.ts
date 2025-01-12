import { FastifyReply, FastifyRequest } from 'fastify';

import { CookieSerializeOptions } from '@fastify/cookie';
import { isDev } from '@valhalla/utilities';

export class AuthManager {
  private static readonly refreshTokenKey = 'x-valhalla-refresh-token' as const;
  private static readonly accessTokenKey = 'x-valhalla-access-token' as const;
  private readonly reply: FastifyReply;
  private readonly request: FastifyRequest;

  private get defaultCookieOptions(): CookieSerializeOptions {
    if (isDev()) {
      return {
        secure: true,
        httpOnly: false,
        sameSite: 'none',
      };
    }

    return {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    };
  }

  constructor(ctx: { reply: FastifyReply; request: FastifyRequest }) {
    this.reply = ctx.reply;
    this.request = ctx.request;
  }

  /**
   * It returns the access token from the request
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
   */
  setRefreshToken(token: string, expires: Date) {
    this.reply.setCookie(AuthManager.refreshTokenKey, token, {
      ...this.defaultCookieOptions,
      expires,
      path: '/',
    });
  }

  /**
   * It clears the refresh token cookie
   */
  removeRefreshToken() {
    this.reply.clearCookie(AuthManager.refreshTokenKey);
  }

  /**
   * It sets the access token in the response header
   */
  setAccessToken(accessToken: string) {
    this.reply.header(AuthManager.accessTokenKey, accessToken);
  }

  /**
   * It returns the cookies from the request object
   */
  get cookies() {
    return this.request.cookies;
  }

  /**
   * It gets the refresh token from the cookie
   */
  getRefreshToken() {
    return this.cookies?.[AuthManager.refreshTokenKey];
  }

  /**
   * It returns the value of the access token key in the request header
   */
  getAccessToken() {
    return this.request.headers[AuthManager.accessTokenKey];
  }
}
