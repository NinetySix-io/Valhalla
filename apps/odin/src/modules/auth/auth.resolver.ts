import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GqlGuard } from '@odin/guards/gql.passport.guard.decorator';
import { Request, Response } from 'express';
import { AuthProviderLinkInput } from './graphql/auth.provider.link.input';
import { AuthProviderUnlinkLinkInput } from './graphql/auth.provider.unlink.input';
import { UserAuthResponse } from './graphql/user.auth.response.type';
import { UserLoginInput } from './graphql/user.login.input';
import { UserRegisterInput } from './graphql/user.register.input';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => UserAuthResponse, { description: 'Log in' })
  async login(
    @Args('input') input: UserLoginInput,
    @Context('req') req: Request,
  ): Promise<UserAuthResponse> {
    const result = await this.authService.login(input.username, input.password);
    this.authService.assignRefreshToken(req, result.token);
    return result;
  }

  @Mutation(() => UserAuthResponse, { description: 'Registration' })
  async register(
    @Args('input') input: UserRegisterInput,
    @Context('req') request: Request,
  ): Promise<UserAuthResponse> {
    const result = await this.authService.signup(input.email, input.password);
    this.authService.assignRefreshToken(request, result.token);
    return result;
  }

  @Mutation(() => Boolean, { description: 'Logout' })
  logout(@Context('req') request: Request) {
    return this.authService.logout(request);
  }

  @Query(() => UserAuthResponse, { description: 'Get Current Access Token' })
  @GqlGuard()
  getAccessToken(@Context('res') response: Response): UserAuthResponse {
    const accessToken = response.getHeader('Authorization') as string;
    return {
      token: accessToken,
    };
  }

  @Mutation(() => Boolean, {
    description: 'Link an authentication provider',
  })
  @GqlGuard()
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

  @Mutation(() => Boolean, {
    description: 'Remove a linked authentication provider',
  })
  @GqlGuard()
  unlinkAuthProvider(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('input') input: AuthProviderUnlinkLinkInput,
  ) {
    return this.userService.unlinkAuthProvider(userId, input.provider);
  }
}
