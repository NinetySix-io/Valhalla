import { gRpcController } from '@app/grpc/grpc.controller';
import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Auth,
  AuthManager,
  RefreshToken,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { LoginWithEmailInput } from './inputs/login.with.email.input';
import { LoginWithPhoneInput } from './inputs/login.with.phone.input';
import { RegisterInput } from './inputs/register.input';
import { LoginResponse } from './responses/login.response';
import { RegisterResponse } from './responses/register.response';

@Resolver()
export class GqlAuthResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => RegisterResponse, {
    description: 'Register user account',
  })
  async registerAccount(
    @Args('input') input: RegisterInput,
  ): Promise<RegisterResponse> {
    const result = await resolveRpcRequest(this.rpcClient.register(input));
    if (!result.account) {
      throw new Error('Unable to register!');
    }

    return {
      accountId: result.account.id,
    };
  }

  @Mutation(() => LoginResponse, {
    description: 'Login to account with email address',
  })
  async loginWithEmail(
    @Args('input') input: LoginWithEmailInput,
    @Auth() auth: AuthManager,
  ): Promise<LoginResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.loginWithEmail(input),
    );

    if (!result.account) {
      throw new Error('Unable to login!');
    }

    auth.setRefreshToken(result.refreshToken);
    auth.setAccessToken(result.accessToken);

    return {
      accountId: result.account.id,
      accessToken: result.accessToken,
      accessTokenExpiresAt: result.accessTokenExpiresAt,
    };
  }

  @Mutation(() => LoginResponse, {
    description: 'Login to account with phone number',
  })
  async loginWithPhone(
    @Args('input') input: LoginWithPhoneInput,
    @Auth() auth: AuthManager,
  ): Promise<LoginResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.loginWithPhone(input),
    );

    if (!result.account) {
      throw new Error('Unable to login!');
    }

    auth.setRefreshToken(result.refreshToken);
    auth.setAccessToken(result.accessToken);

    return {
      accountId: result.account.id,
      accessToken: result.accessToken,
      accessTokenExpiresAt: result.accessTokenExpiresAt,
    };
  }

  @Query(() => String, {
    description: 'Generate an access token',
  })
  async accessToken(@RefreshToken() refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new BadRequestException('Refresh Token not found!');
    }

    const result = await resolveRpcRequest(
      this.rpcClient.provisionAccessToken({
        refreshToken,
      }),
    );

    return result.accessToken;
  }
}
