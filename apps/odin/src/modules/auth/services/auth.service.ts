import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { Environment } from '@odin/environment';
import { JwtService } from './jwt.service';
import type { Request } from 'express';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserAuthResponse } from '../graphql/user.auth.response.type';
import { UserPasswordsModel } from '@odin/data.models/user.passwords';
import { UserRefreshTokensModel } from '@odin/data.models/user.refresh.tokens';
import { UsersModel } from '@odin/data.models/users';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwords: UserPasswordsModel,
    private readonly users: UsersModel,
    private readonly authProviders: UserAuthProvidersModel,
    private readonly refreshTokens: UserRefreshTokensModel,
    private readonly jwtService: JwtService,
  ) {}

  private get cookieId() {
    return Environment.variables.COOKIE_IDENTIFIER;
  }

  assignRefreshToken(request: Request, token: string) {
    request.res.cookie(this.cookieId, token, {
      httpOnly: true,
      secure: Environment.isProd,
    });
  }

  /**
   * TODO: fix this
   */
  async validateOAuthLogin(
    provider: AuthProvider,
    payload: {
      userId: string;
      username?: string;
      email: string;
      displayName: string;
      picture?: string;
      raw: any;
      accessToken: string;
      refreshToken: string;
    },
  ) {
    if (!payload.email) {
      throw new BadRequestException('Unable to identify user');
    }

    const user = await this.users.findOrCreate({
      email: payload.email,
      displayName: payload.displayName,
      avatar: payload.picture,
    });

    await this.authProviders.upsertProvider(user, provider, payload);
    const jwt = this.jwtService.signToken(user);

    return {
      user,
      jwt,
    };
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.users.findOne({ email: userEmail });
    const password = await this.passwords.findByUser(user);
    const passwordMatches = await this.passwords.validatePassword(
      userPassword,
      password.hashed,
    );

    if (passwordMatches) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async checkUsernameAvailability(userEmail: string) {
    const exists = await this.users.exists({ email: userEmail });
    if (exists) {
      throw new BadRequestException('Email is taken');
    }
  }

  async logout(request: Request): Promise<boolean> {
    const refreshToken: string = request.cookies[this.cookieId];
    if (!refreshToken || !mongoose.isObjectIdOrHexString(refreshToken)) {
      return false;
    }

    const tokenId = new mongoose.Types.ObjectId(refreshToken);
    await this.refreshTokens.deleteToken(tokenId);
    return true;
  }

  async login(email: string, password: string): Promise<UserAuthResponse> {
    const user = await this.validateUser(email, password);
    const token = await this.refreshTokens.createToken(user);
    return {
      token: token.toHexString(),
    };
  }

  async signup(email: string, password: string): Promise<UserAuthResponse> {
    await this.checkUsernameAvailability(email);
    const displayName = email;
    const user = await this.users.create({ email, displayName });
    const [token] = await Promise.all([
      this.refreshTokens.createToken(user),
      this.passwords.createPassword(user, password),
    ]);

    return {
      token: token.toHexString(),
    };
  }
}
