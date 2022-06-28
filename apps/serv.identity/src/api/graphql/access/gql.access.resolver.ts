import { gRpcController } from '@app/grpc/grpc.controller';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
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
import { AuthResponse } from './responses/auth.response';
import { TokenResponse } from './responses/token.response';

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
    const { accessToken, refreshToken, account } = result;

    if (!accessToken) {
      throw new InternalServerErrorException();
    } else if (!refreshToken) {
      throw new InternalServerErrorException();
    } else if (!account) {
      throw new InternalServerErrorException();
    }

    auth.setRefreshToken(refreshToken.value, new Date(refreshToken.expiresAt));

    return {
      accountId: account.id,
      accessToken: {
        value: accessToken.value,
        expiresAt: new Date(accessToken.expiresAt),
      },
    };
  }

  @Mutation(() => AuthResponse, {
    description: 'Login to account with verification code',
  })
  async loginWithVerification(
    @Args('input') input: LoginWithVerificationInput,
    @Auth() auth: AuthManager,
  ): Promise<AuthResponse> {
    const command = this.rpcClient.loginWithVerification(input);
    const result = await resolveRpcRequest(command);
    const { accessToken, account, refreshToken } = result;

    if (!accessToken) {
      throw new InternalServerErrorException();
    } else if (!refreshToken) {
      throw new InternalServerErrorException();
    } else if (!account) {
      throw new InternalServerErrorException();
    }

    auth.setRefreshToken(refreshToken.value, new Date(refreshToken.expiresAt));

    return {
      accountId: account.id,
      accessToken: {
        value: accessToken.value,
        expiresAt: new Date(accessToken.expiresAt),
      },
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

  @Query(() => TokenResponse, {
    description: 'Generate an access token',
  })
  async accessToken(
    @RefreshToken() refreshToken: string,
    @Args('query') query: AccessTokenQuery,
  ): Promise<TokenResponse> {
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
    } else if (!result?.accessToken) {
      throw new InternalServerErrorException();
    }

    return {
      value: result.accessToken.value,
      expiresAt: new Date(result.accessToken?.expiresAt),
    };
  }
}
