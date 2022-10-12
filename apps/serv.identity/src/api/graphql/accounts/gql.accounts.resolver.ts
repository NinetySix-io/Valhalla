import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { AddEmailArgs } from './gql.args/add.email.args';
import { AddPhoneArgs } from './gql.args/add.phone.args';
import { RemoveEmailArgs } from './gql.args/remove.email.args';
import { RemovePhoneArgs } from './gql.args/remove.phone.args';
import { UpdateAccountArgs } from './gql.args/update.account.args';
import { SessionResponse } from './gql.responses/session.response';
import { Account } from './gql.types/account';

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
  @Query(() => Account, {
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
    @Args() args: UpdateAccountArgs,
  ) {
    await resolveRpcRequest(
      this.rpcClient.updateAccount({
        accountId: account.id,
        displayName: args.input.displayName,
        firstName: args.input.firstName,
        lastName: args.input.lastName,
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
    @Args() args: AddEmailArgs,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.addEmailToAccount({
        accountId: account.id,
        email: args.email,
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
    @Args() args: AddPhoneArgs,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.addPhoneToAccount({
        accountId: account.id,
        phone: args.phone,
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
    @Args() args: RemoveEmailArgs,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.removeEmailFromAccount({
        accountId: account.id,
        emailId: args.emailId,
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
    @Args() args: RemovePhoneArgs,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.removePhoneFromAccount({
        accountId: account.id,
        phoneId: args.phoneId,
      }),
    );

    return true;
  }
}
