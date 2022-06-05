import { AccountSchema } from '@app/entities/accounts/schema';
import {
  CurrentAccount,
  EmailParamValidation,
  GqlAuthGuard,
  ParamValidationPipe,
  PhoneParamValidation,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { Account } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Mutation } from '@nestjs/graphql';

@Resolver()
export class GqlAccountResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => AccountSchema, {
    description: 'Get current logged in user information',
  })
  account(@CurrentAccount() account: Account): Account {
    return account;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Add email address to account',
  })
  async addEmailToAccount(
    @CurrentAccount() account: Account,
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
    @CurrentAccount() account: Account,
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
    @CurrentAccount() account: Account,
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
    @CurrentAccount() account: Account,
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
