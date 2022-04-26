import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { Environment } from '@serv.odin/environment';
import { JwtService } from '../services/jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { UserRefreshTokensModel } from '@serv.odin/data.models/user.refresh.tokens';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { castRefId } from '@serv.odin/lib/cast.ref.id';
import mongoose from 'mongoose';
import { tryNice } from 'try-nice';

export const TOKEN_PASSPORT = 'token' as const;

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, TOKEN_PASSPORT) {
  private readonly logger = new Logger(TokenStrategy.name);

  constructor(
    private readonly refreshTokens: UserRefreshTokensModel,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  private getRefreshTokenFromRequest(request: Request) {
    const tokenId = Environment.variables.COOKIE_IDENTIFIER;
    const refreshToken = request.cookies[tokenId];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return new mongoose.Types.ObjectId(refreshToken);
  }

  private async getUserFromRequestToken(requestToken: mongoose.Types.ObjectId) {
    const entry = await this.refreshTokens
      .findToken(requestToken)
      .orFail(new UnauthorizedException());

    return castRefId(entry.user);
  }

  private async getUserFromRequest(
    request: Request,
  ): Promise<UserSchema['_id']> {
    const token = request.headers.authorization;
    const refreshToken = this.getRefreshTokenFromRequest(request);
    const [payload] = await tryNice(() => this.jwtService.verifyToken(token));
    if (payload?.user && mongoose.isValidObjectId(payload.user)) {
      request.res.setHeader('Authorization', token);
      return new mongoose.Types.ObjectId(payload.user);
    } else if (refreshToken) {
      const user = await this.getUserFromRequestToken(refreshToken);
      const nextRefreshToken = this.jwtService.signToken({ _id: user });
      this.logger.warn(`Access token update for User[${user.toHexString()}]`);
      request.res.setHeader('Authorization', nextRefreshToken);
      return user;
    }

    throw new UnauthorizedException();
  }

  async validate(request: Request): Promise<UserSchema['_id']> {
    const user = await this.getUserFromRequest(request);
    return user;
  }
}
