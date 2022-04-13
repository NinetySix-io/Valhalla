import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { AuthResponse } from '../graphql/auth.response.type';
import { JwtService } from '@nestjs/jwt';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserPasswordsModel } from '@odin/data.models/user.passwords';
import { UserSchema } from '@odin/data.models/users/schema';
import { UsersModel } from '@odin/data.models/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwords: UserPasswordsModel,
    private readonly users: UsersModel,
    private readonly authProviders: UserAuthProvidersModel,
    private readonly jwtService: JwtService,
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

    const user = await this.users.findOrCreate({
      email: payload.email,
      displayName: payload.displayName,
      avatar: payload.picture,
    });

    await this.authProviders.upsertProvider(user, provider, payload);

    return {
      user,
      jwt: this.signToken(user),
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

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.signToken(user);
  }

  async signup(email: string, password: string) {
    const displayName = email;
    const user = await this.users.create({ email, displayName });
    await this.passwords.createPassword(user, password);
    return this.signToken(user);
  }
}
