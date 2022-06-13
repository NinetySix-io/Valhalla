import { OrganizationSchema } from '@app/entities/organizations/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Organization } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServIdentity } from '@valhalla/serv.clients';
import {
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';

@Resolver()
export class GqlAccountResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { description: 'Set active org for account' })
  async setAccountActiveOrg(
    @Args('organization') org: string,
    @CurrentAccount() account: ServIdentity.Account,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.setAccountActiveOrg({
        accountId: account.id,
        organizationId: org,
      }),
    );

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => OrganizationSchema, {
    nullable: true,
    description: 'Current Active Organization',
  })
  async activeOrg(
    @CurrentAccount() account: ServIdentity.Account,
  ): Promise<Organization> {
    const result = await resolveRpcRequest(
      this.rpcClient.getAccountActiveOrg({
        accountId: account.id,
      }),
    );

    return result.organization;
  }
}
