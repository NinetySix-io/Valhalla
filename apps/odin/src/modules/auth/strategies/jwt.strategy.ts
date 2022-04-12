import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';

import { Environment } from '@odin/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';

export const JWT_PASSPORT = 'jwt' as const;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_PASSPORT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Environment.variables.JWT_SECRET,
    });
  }

  async validate(payload: { user: string }) {
    Logger.log(`JWT UserProfile`, 'Auth', payload);
    const userId = new mongoose.Types.ObjectId(payload.user);
    return {
      userId,
    };
  }
}
