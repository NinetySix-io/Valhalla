import { AccountSchema } from '@app/entities/accounts/schema';

import { gRpcController } from '@app/grpc/grpc.controller';
import { Account } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  EmailParamValidation,
  GqlAuthGuard,
  ParamValidationPipe,
  PhoneParamValidation,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { UpdateAccountInput } from './inputs/update.account.input';
import { SessionResponse } from './responses/session.response';

@Resolver()
export class GqlAccountResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => SessionResponse, {
    description: 'Get current session user',
  })
  session(@CurrentAccount() account: AuthAccount): AuthAccount {
    return account;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AccountSchema, {
    description: 'Get current logged in user information',
  })
  async account(@CurrentAccount() account: AuthAccount): Promise<Account> {
    const response = await resolveRpcRequest(
      this.rpcClient.findAccount({
        accountId: account.id,
      }),
    );

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { description: 'Update account' })
  async updateAccount(
    @CurrentAccount() account: AuthAccount,
    @Args('input') input: UpdateAccountInput,
  ) {
    await resolveRpcRequest(
      this.rpcClient.updateAccount({
        accountId: account.id,
        displayName: input.displayName,
        firstName: input.firstName,
        lastName: input.lastName,
      }),
    );

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Add email address to account',
  })
  async addEmailToAccount(
    @CurrentAccount() account: AuthAccount,
    @Args('email', new ParamValidationPipe([EmailParamValidation]))
    email: string,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.addEmailToAccount({
        accountId: account.id,
        email,
      }),
    );

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Add phone number to account',
  })
  async addPhoneToAccount(
    @CurrentAccount() account: AuthAccount,
    @Args('phone', new ParamValidationPipe([PhoneParamValidation]))
    phone: string,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.addPhoneToAccount({
        accountId: account.id,
        phone,
      }),
    );

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Remove associated email from account',
  })
  async removeEmailFromAccount(
    @CurrentAccount() account: AuthAccount,
    @Args('email', new ParamValidationPipe([EmailParamValidation]))
    email: string,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.removeEmailFromAccount({
        accountId: account.id,
        email,
      }),
    );

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Remove associated phone from account',
  })
  async removePhoneFromAccount(
    @CurrentAccount() account: AuthAccount,
    @Args('phone', new ParamValidationPipe([PhoneParamValidation]))
    phone: string,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.removePhoneFromAccount({
        accountId: account.id,
        phone,
      }),
    );

    return true;
  }
}
