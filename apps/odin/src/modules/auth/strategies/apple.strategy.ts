// TODO: Integrate apple oauth
// This file is not tested

import ApplePassport from 'passport-apple';
import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthService } from '../services/auth.service';
import { Environment } from '@odin/environment';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

export const APPLE_PASSPORT = 'apple' as const;
@Injectable()
export class AppleStrategy extends PassportStrategy(
  ApplePassport,
  APPLE_PASSPORT,
) {
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
    accessToken: string,
    refreshToken: string,
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
        raw: jsonProfile,
        accessToken,
        refreshToken,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        AuthProvider.APPLE,
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
