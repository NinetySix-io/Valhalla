import { gRpcController } from '@app/grpc/grpc.controller';
import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Auth,
  AuthManager,
  RefreshToken,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { tryNice } from 'try-nice';
import { AccessTokenQuery } from './inputs/get.access.token.input';
import { LoginWithVerificationInput } from './inputs/login.with.verification.input';
import { RegisterInput } from './inputs/register.input';
import { AccessTokenResponse } from './responses/access.token.response';
import { AuthResponse } from './responses/auth.response';

@Resolver()
export class GqlAuthResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => AuthResponse, {
    description: 'Register user account',
  })
  async registerAccount(
    @Args('input') input: RegisterInput,
    @Auth() auth: AuthManager,
  ): Promise<AuthResponse> {
    const result = await resolveRpcRequest(this.rpcClient.register(input));
    auth.setRefreshToken(result.refreshToken);

    return {
      accountId: result.account!.id,
      accessToken: result.accessToken,
      accessTokenExpiresAt: new Date(result.accessToken),
    };
  }

  @Mutation(() => AuthResponse, {
    description: 'Login to account with verification code',
  })
  async loginWithVerification(
    @Args('input') input: LoginWithVerificationInput,
    @Auth() auth: AuthManager,
  ): Promise<AuthResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.loginWithVerification(input),
    );

    auth.setRefreshToken(result.refreshToken);

    return {
      accountId: result.account!.id,
      accessToken: result.accessToken,
      accessTokenExpiresAt: new Date(result.accessTokenExpiresAt),
    };
  }

  @Mutation(() => Boolean, {
    description: 'Invalid current session',
  })
  async logout(@Auth() auth: AuthManager): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.logout({
        refreshToken: auth.getRefreshToken(),
      }),
    );

    auth.removeRefreshToken();

    return true;
  }

  @Query(() => AccessTokenResponse, {
    description: 'Generate an access token',
  })
  async accessToken(
    @RefreshToken() refreshToken: string,
    @Args('query') query: AccessTokenQuery,
  ): Promise<AccessTokenResponse> {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh Token not found!');
    }

    const [result, error] = await tryNice(() =>
      resolveRpcRequest(
        this.rpcClient.provisionAccessToken({
          refreshToken,
          organization: query.organization,
        }),
      ),
    );

    if (error instanceof Error) {
      throw new ForbiddenException(error.message);
    } else if (!result) {
      throw new Error('Unexpected Error!');
    }

    return {
      token: result.accessToken,
      expiresAt: new Date(result.accessTokenExpiresAt),
    };
  }
}
