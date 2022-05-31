import { isNil } from '@valhalla/utilities';

export class CookiesJar {
  /**
   * Match field-content in RFC 7230 sec 3.2
   *
   * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
   * field-vchar   = VCHAR / obs-text
   * obs-text      = %x80-FF
   *
   * @param {string} cookieName - The name of the cookie to be set.
   * @returns A boolean value.
   */
  private static isContextRegex(cookieName: string): boolean {
    // eslint-disable-next-line no-control-regex
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/u;
    return fieldContentRegExp.test(cookieName);
  }

  static buildCookie(
    options: {
      /**
       * Name of the cookie
       */
      name: string;

      /**
       * Value of the cookie
       */
      value: string;

      /**
       * Host to which the cookie will be sent
       * If root domain is used, all subdomains will be valid
       */
      domain?: string;

      /**
       * Path that must exist in the requested URL
       * for the browser to send the Cookie header.
       */
      path?: string;

      /**
       * Sent to the server only when a request is
       * made with the https: scheme (except on localhost)
       */
      secure?: boolean;

      /**
       * Forbids JavaScript from accessing the cookie
       */
      httpOnly?: boolean;

      /**
       * Controls whether or not a cookie is sent with cross-origin requests
       *
       * Strict - the cookie only for same-site requests,
       * that is, requests originating from the same site that set the cookie.
       *
       * Lax - sent when a user is navigating to the origin site from an external site
       *
       * None - Sends the cookie with both cross-site and same-site requests.
       * The Secure attribute must also be set when setting this value,
       */
      sameSite?: 'Strict' | 'Lax' | 'None';
    } & (
      | {
          /**
           * Date that the cookie expires
           */
          expires?: Date;
        }
      | {
          /**
           * Number of seconds until cookie expires
           */
          maxAge?: number;
        }
    ),
  ): string {
    const cookieParts: string[] = [];
    if (!this.isContextRegex(options.name)) {
      throw new TypeError('Name is invalid');
    }

    if ('maxAge' in options && !isNil(options.maxAge)) {
      if (Number.isNaN(options.maxAge) || !Number.isFinite(options.maxAge)) {
        throw new TypeError('maxAge is must be a finite number');
      }

      cookieParts.push(`Max-Age=${options.maxAge.toString}`);
    } else if ('expires' in options && options.expires) {
      cookieParts.push(`Expires=${options.expires.toUTCString()}`);
    }

    if (options.httpOnly) {
      cookieParts.push('HttpOnly');
    }

    if (options.secure) {
      cookieParts.push('Secure');
    }

    if (options.sameSite) {
      cookieParts.push(`SameSite=${options.sameSite}`);
    }

    cookieParts.unshift(`${options.name}=${options.value}`);
    return cookieParts.join('; ');
  }

  static parseCookie(cookieStr: string) {
    const cookies: Record<string, string> = {};
    const requestCookies = cookieStr.split('; ') ?? [];
    for (const cookie of requestCookies) {
      if (cookie.trim()) {
        const [name, value] = cookie.split('=');
        cookies[name] = value;
      }
    }

    return cookies;
  }
}
