import { Environment } from '@odin/config/environment';
import { OAuth2 } from 'oauth';

export class FacebookService {
  oauth;

  constructor() {
    this.oauth = new OAuth2(
      Environment.variables.FACEBOOK_CLIENT_ID,
      Environment.variables.FACEBOOK_CLIENT_SECRET,
      'https://graph.facebook.com',
      null,
      'oauth2/token',
      null,
    );
  }

  getImage(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        'https://graph.facebook.com/v4.0/me/picture?redirect=false&type=large',
        token,
        (err, results) => {
          if (err) {
            reject(err);
          }

          const result = JSON.parse(results || {});
          const data = (result && result.data) || {};
          resolve(data);
        },
      );
    });
  }
}
