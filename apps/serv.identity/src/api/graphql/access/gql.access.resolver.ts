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
import { VoidResolver } from 'graphql-scalars';
import { tryNice } from 'try-nice';
import { GetAccessTokenArgs } from './gql.args/get.access.token.args';
import { LoginWithVerificationArgs } from './gql.args/login.with.verification.input';
import { AccountRegisterArgs } from './gql.args/register.input';
import { AuthResponse } from './gql.responses/auth.response';
import { TokenResponse } from './gql.responses/token.response';

@Resolver()
export class GqlAuthResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => AuthResponse, {
    description: 'Register user account',
  })
  async registerAccount(
    @Args() args: AccountRegisterArgs,
    @Auth() auth: AuthManager,
  ): Promise<AuthResponse> {
    const result = await resolveRpcRequest(this.rpcClient.register(args));
    const { accessToken, refreshToken, account } = result;

    if (!accessToken) {
      throw new InternalServerErrorException();
    } else if (!refreshToken) {
      throw new InternalServerErrorException();
    } else if (!account) {
      throw new InternalServerErrorException();
    }

    auth.setRefreshToken(refreshToken.value, refreshToken.expiresAt!);

    return {
      accountId: account.id,
      accessToken: {
        value: accessToken.value,
        expiresAt: accessToken.expiresAt!,
      },
    };
  }

  @Mutation(() => AuthResponse, {
    description: 'Login to account with verification code',
  })
  async loginWithVerification(
    @Auth() auth: AuthManager,
    @Args() args: LoginWithVerificationArgs,
  ): Promise<AuthResponse> {
    const command = this.rpcClient.loginWithVerification(args);
    const result = await resolveRpcRequest(command);
    const { accessToken, account, refreshToken } = result;

    if (!accessToken) {
      throw new InternalServerErrorException();
    } else if (!refreshToken) {
      throw new InternalServerErrorException();
    } else if (!account) {
      throw new InternalServerErrorException();
    }

    auth.setRefreshToken(refreshToken.value, refreshToken.expiresAt!);

    return {
      accountId: account.id,
      accessToken: {
        value: accessToken.value,
        expiresAt: accessToken.expiresAt!,
      },
    };
  }

  @Mutation(() => VoidResolver, {
    description: 'Invalid current session',
  })
  async logout(@Auth() auth: AuthManager): Promise<void> {
    await resolveRpcRequest(
      this.rpcClient.logout({
        refreshToken: auth.getRefreshToken(),
      }),
    );

    auth.removeRefreshToken();
  }

  @Query(() => TokenResponse, {
    description: 'Generate an access token',
  })
  async accessToken(
    @RefreshToken() refreshToken: string,
    @Args() args: GetAccessTokenArgs,
  ): Promise<TokenResponse> {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh Token not found!');
    }

    const [result, error] = await tryNice(() =>
      resolveRpcRequest(
        this.rpcClient.provisionAccessToken({
          refreshToken,
          organization: args.organizationId,
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
      expiresAt: result.accessToken.expiresAt!,
    };
  }
}
