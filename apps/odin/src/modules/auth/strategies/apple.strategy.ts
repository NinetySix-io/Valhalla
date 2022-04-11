// TODO: Integrate apple oauth
// This file is not tested

import { AuthService, Provider } from '../services/auth.service';

import ApplePassport from 'passport-apple';
import { Environment } from '@odin/config/environment';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

@Injectable()
export class AppleStrategy extends PassportStrategy(ApplePassport, 'apple') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Environment.variables.APPLE_CLIENT_ID,
      teamID: Environment.variables.APPLE_TEAM_ID,
      keyID: Environment.variables.APPLE_KEY_ID,
      callbackURL: `${Environment.serviceUrl}/auth/apple/callback`,
      privateKeyLocation: '',
      passReqToCallback: true,
    });
  }

  async validate(
    _req: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const [, error] = await tryNice(async () => {
      const jsonProfile = (profile && profile._json) || {};
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        facebook: profile.id || jsonProfile.id,
        username: profile.userName || jsonProfile.userName,
        email: profile.email || jsonProfile.email,
        displayName: profile.displayName,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        userProfile,
        Provider.APPLE,
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
