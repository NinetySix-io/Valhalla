import { Injectable, Logger } from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthService } from '../services/auth.service';
import { Environment } from '@odin/environment';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

export const GITHUB_PASSPORT = 'github' as const;
@Injectable()
export class GithubStrategy extends PassportStrategy(
  Strategy,
  GITHUB_PASSPORT,
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Environment.variables.GITHUB_CLIENT_ID,
      clientSecret: Environment.variables.GITHUB_CLIENT_SECRET,
      callbackURL: `${Environment.serviceUrl}/auth/github/callback`,
      passReqToCallback: true,
      scope: ['user:email'],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const [, error] = await tryNice(async () => {
      Logger.log(`GitHub UserProfile`, 'Auth');
      const jsonProfile = (profile && profile._json) || {};
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        github: profile.id || jsonProfile.id,
        username: profile.login || jsonProfile.login,
        email:
          profile.email ||
          (Array.isArray(profile.emails) && profile.emails[0].value),
        displayName: profile.displayName || jsonProfile.displayName,
        picture: `${jsonProfile.avatar_url}&size=200`,
        raw: jsonProfile,
        accessToken,
        refreshToken,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        AuthProvider.GITHUB,
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
