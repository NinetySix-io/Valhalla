import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { Environment } from '@odin/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/*private readonly authService: AuthService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Environment.variables.JWT_SECRET,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    // You could add a function to the authService to verify the claims of the token:
    // i.e. does the user still have the roles that are claimed by the token
    // const validClaims = await this.authService.verifyTokenClaims(payload);

    // if (!validClaims)
    //    return done(new UnauthorizedException('invalid token claims'), false);

    done(null, payload);
  }
}
