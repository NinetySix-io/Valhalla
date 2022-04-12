import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { Environment } from '@odin/config/environment';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export const JWT_PASSPORT = 'jwt' as const;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_PASSPORT) {
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
