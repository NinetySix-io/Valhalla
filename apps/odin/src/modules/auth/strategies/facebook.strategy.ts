import { AuthService, Provider } from '../services/auth.service';
import { Injectable, Logger } from '@nestjs/common';

import { Environment } from '@odin/config/environment';
import { FacebookService } from '../services/facebook.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,
    private facebookService: FacebookService,
  ) {
    super({
      clientID: Environment.variables.FACEBOOK_CLIENT_ID,
      clientSecret: Environment.variables.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${Environment.serviceUrl}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
      scope: ['email'],
    });
  }

  async validate(
    _req: any,
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const [, error] = await tryNice(async () => {
      Logger.log(`Facebook UserProfile`, 'Auth');
      // get larger image from Facebook Graph API
      const image = await this.facebookService.getImage(accessToken);
      const jsonProfile = (profile && profile._json) || {};
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        facebook: profile.id || jsonProfile.id,
        username: profile.userName || jsonProfile.userName,
        email: profile.email || jsonProfile.email,
        displayName: profile.displayName,
        picture: (image && image.url) || profile.photos[0].value,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        userProfile,
        Provider.FACEBOOK,
      );
      done(null, {
        ...JSON.parse(JSON.stringify(oauthResponse.user)),
        jwt: oauthResponse.jwt,
      });
    });

    if (error) {
      done(error, false);
    }
  }
}
