import { AccountSchema } from '@app/entities/accounts/schema';
import { CurrentAccount, GqlAuthGuard } from '@valhalla/serv.core';
import { Account } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GqlAccountResolver {
  @Query(() => AccountSchema, {
    description: 'Get current logged in user information',
  })
  @UseGuards(GqlAuthGuard)
  account(@CurrentAccount() account: Account): Account {
    return account;
  }
}
