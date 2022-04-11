import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthResponse } from '../graphql/auth.response.type';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { UserAuthProviderService } from './user.auth.provider.service';
import { UserSchema } from '@odin/data.models/users/schema';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly authProviderService: UserAuthProviderService,
  ) {}

  private signToken(user: UserSchema): AuthResponse {
    return {
      token: this.jwtService.sign({
        user: user._id.toHexString(),
      }),
    };
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

    const user = await this.userService.findOrCreate({
      email: payload.email,
      displayName: payload.displayName,
      avatar: payload.picture,
    });

    await this.authProviderService.upsertProvider(user._id, provider, payload);
    return {
      user,
      jwt: this.signToken(user),
    };
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    const password = await this.passwordService.findByUserId(user._id);
    const passwordMatches = await this.passwordService.validate(
      userPassword,
      password.hashed,
    );

    if (passwordMatches) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.signToken(user);
  }

  async signup(email: string, password: string) {
    const displayName = email;
    const newUser = await this.userService.create({ email, displayName });
    const hashed = await bcrypt.hash(password, 10);
    await this.passwordService.create({ user: newUser._id, hashed });
    return this.signToken(newUser);
  }
}
