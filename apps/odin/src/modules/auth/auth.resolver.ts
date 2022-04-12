import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import mongoose from 'mongoose';
import { User } from '../users/graphql/user.type';
import { AuthProviderLinkInput } from './graphql/auth.provider.link.input';
import { AuthProviderUnlinkLinkInput } from './graphql/auth.provider.unlink.input';
import { AuthResponse } from './graphql/auth.response.type';
import { UserLoginInput } from './graphql/user.login.input';
import { UserRegisterInput } from './graphql/user.register.input';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UseGuards } from '@nestjs/common';
import { UserSchema } from '@odin/data.models/users/schema';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => AuthResponse, { description: 'Log in' })
  login(@Args('input') input: UserLoginInput): Promise<AuthResponse> {
    return this.authService.login(input.username, input.password);
  }

  @Mutation((returns) => AuthResponse, { description: 'Registration' })
  register(@Args('input') input: UserRegisterInput): Promise<AuthResponse> {
    return this.authService.signup(input.email, input.password);
  }

  @Mutation((returns) => Boolean, {
    description: 'Link an authentication provider',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  linkAuthProvider(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('input') input: AuthProviderLinkInput,
  ) {
    return this.userService.linkAuthProvider(
      userId,
      input.provider,
      input.token,
    );
  }

  @Mutation((returns) => Boolean, {
    description: 'Remove a linked authentication provider',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  unlinkAuthProvider(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('input') input: AuthProviderUnlinkLinkInput,
  ) {
    return this.userService.unlinkAuthProvider(userId, input.provider);
  }
}
