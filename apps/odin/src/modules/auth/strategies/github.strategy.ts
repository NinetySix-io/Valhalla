import { AuthService, Provider } from '../services/auth.service';
import { Injectable, Logger } from '@nestjs/common';

import { Environment } from '@odin/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';
import { tryNice } from 'try-nice';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
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
    _accessToken: string,
    _refreshToken: string,
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
      };
      console.log('userProfile::', userProfile, ' - req::', req.headers);
      const oauthResponse = await this.authService.validateOAuthLogin(
        userProfile,
        Provider.GITHUB,
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
