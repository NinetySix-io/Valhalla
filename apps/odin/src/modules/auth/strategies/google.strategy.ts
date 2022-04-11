import { Injectable, Logger } from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthService } from '../services/auth.service';
import { Environment } from '@odin/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Environment.variables.GOOGLE_CLIENT_ID,
      clientSecret: Environment.variables.GOOGLE_CLIENT_SECRET,
      callbackURL: `${Environment.serviceUrl}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const [, error] = await tryNice(async () => {
      Logger.log(`Google UserProfile`, 'Auth');
      const jsonProfile = (profile && profile._json) || {};

      const userProfile = {
        userId: jsonProfile.sub,
        google: jsonProfile.sub,
        username: jsonProfile.userName,
        email: jsonProfile.email,
        displayName: profile.displayName,
        picture: jsonProfile.picture.replace('sz=50', 'sz=200'),
        raw: jsonProfile,
        refreshToken,
        accessToken,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        AuthProvider.GOOGLE,
        userProfile,
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
