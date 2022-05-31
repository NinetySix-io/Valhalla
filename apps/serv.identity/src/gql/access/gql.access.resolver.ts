import {
  Auth,
  AuthManager,
  RefreshToken,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { RpcController } from '@app/rpc/rpc.controller';
import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountLoginInput } from './inputs/login.input';
import { AccountRegisterInput } from './inputs/register.input';
import { AccountLoginResponse } from './responses/login.response';
import { AccountRegisterResponse } from './responses/register.response';
@Resolver()
export class GqlAuthResolver {
  constructor(private readonly rpcClient: RpcController) {}

  @Mutation(() => AccountRegisterResponse, {
    description: 'Register user account',
  })
  async registerAccount(
    @Args('input') input: AccountRegisterInput,
  ): Promise<AccountRegisterResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.accountRegister(input),
    );

    if (!result.account) {
      throw new Error('Unable to register!');
    }

    return {
      accountId: result.account.id,
    };
  }

  @Mutation(() => AccountLoginResponse, {
    description: 'Login to account',
  })
  async loginToAccount(
    @Args('input') input: AccountLoginInput,
    @Auth() auth: AuthManager,
  ): Promise<AccountLoginResponse> {
    const result = await resolveRpcRequest(this.rpcClient.accountLogin(input));
    auth.setRefreshToken(result.refreshToken);
    auth.setAccessToken(result.accessToken);

    if (!result.account) {
      throw new Error('Unable to register!');
    }

    return {
      accountId: result.account.id,
      accessToken: result.accessToken,
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
