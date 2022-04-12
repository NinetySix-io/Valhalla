import { Injectable, Logger } from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthService } from '../services/auth.service';
import { Environment } from '@odin/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter-oauth2';
import { VerifiedCallback } from 'passport-jwt';

export const TWITTER_PASSPORT = 'twitter' as const;

@Injectable()
export class TwitterStrategy extends PassportStrategy(
  Strategy,
  TWITTER_PASSPORT,
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Environment.variables.TWITTER_CLIENT_ID,
      clientSecret: Environment.variables.TWITTER_CLIENT_SECRET,
      callbackURL: `${Environment.serviceUrl}/auth/twitter/callback`,
      passReqToCallback: true,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    try {
      Logger.log(`Twitter UserProfile`, 'Auth');
      const jsonProfile = (profile && profile._json) || {};
      console.log(profile);
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        twitter: profile.id || jsonProfile.id,
        username: profile.userName || jsonProfile.userName,
        email: profile.email || jsonProfile.email,
        displayName: profile.displayName,
        picture: null,
        raw: jsonProfile,
        accessToken,
        refreshToken,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        AuthProvider.TWITTER,
        userProfile,
      );
      done(null, {
        ...JSON.parse(JSON.stringify(oauthResponse.user)),
        jwt: oauthResponse.jwt,
      });
    } catch (err) {
      done(err, false);
    }
  }
}
