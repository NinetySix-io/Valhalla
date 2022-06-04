import { OrganizationSchema } from '@app/entities/organizations/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Organization, OrgPlan } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { ServIdentity } from '@valhalla/serv.clients';
import {
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateOrganizationInput } from './inputs/create.org.input';

@Resolver()
export class GqlOrganizationsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => OrganizationSchema, { description: 'Create an organization' })
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
    @CurrentAccount() account: ServIdentity.Account,
  ): Promise<Organization> {
    const response = await resolveRpcRequest(
      this.rpcClient.createOrg({
        requestedUserId: account.id,
        name: input.name,
        plan: OrgPlan.FREE,
      }),
    );

    return response;
  }

  @Mutation(() => String, { description: 'Archive an organization' })
  async archiveOrganization(
    @Args('orgId') orgId: string,
    @CurrentAccount() account: ServIdentity.Account,
  ): Promise<string> {
    const response = await resolveRpcRequest(
      this.rpcClient.archiveOrg({
        requestedUserId: account.id,
        orgId,
      }),
    );

    return response.id;
  }

  @Mutation(() => String, {
    description: 'Restore an organization that was archived',
  })
  async restoreOrganization(
    @Args('orgId') orgId: string,
    @CurrentAccount() account: ServIdentity.Account,
  ) {
    const response = await resolveRpcRequest(
      this.rpcClient.restoreOrg({
        requestedUserId: account.id,
        orgId,
      }),
    );

    return response.id;
  }

  @Query(() => [OrganizationSchema], {
    description: "Get current user's organizations memberships",
  })
  @UseGuards(GqlAuthGuard)
  async organizations(
    @CurrentAccount() account: ServIdentity.Account,
  ): Promise<Organization[]> {
    const response = await resolveRpcRequest(
      this.rpcClient.getUserMemberships({
        userId: account.id,
      }),
    );

    return response.organizations;
  }
}
