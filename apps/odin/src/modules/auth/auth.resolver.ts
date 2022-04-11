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

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => AuthResponse, { description: 'Log in' })
  async login(@Args('input') input: UserLoginInput): Promise<AuthResponse> {
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
  async linkAuthProvider(
    @CurrentUser() user: User,
    @Args('input') input: AuthProviderLinkInput,
  ) {
    return this.userService.linkAuthProvider(
      new mongoose.Types.ObjectId(user.id),
      input.provider,
      input.token,
    );
  }

  @Mutation((returns) => Boolean, {
    description: 'Remove a linked authentication provider',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  async unlinkAuthProvider(
    @CurrentUser() user: User,
    @Args('input') input: AuthProviderUnlinkLinkInput,
  ) {
    return this.userService.unlinkAuthProvider(
      new mongoose.Types.ObjectId(user.id),
      input.provider,
    );
  }
}
