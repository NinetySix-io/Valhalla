import { OrgMemberSchema } from '@app/entities/org.members/schema';
import { OrganizationSchema } from '@app/entities/organizations/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Member, Organization, OrgPlan } from '@app/protobuf';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateOrganizationInput } from './inputs/create.org.input';
import { OrganizationBySlugResponse } from './responses/org.by.slug.response';

@Resolver()
export class GqlOrganizationsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => OrganizationSchema, { description: 'Create an organization' })
  @UseGuards(GqlAuthGuard)
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
    @CurrentAccount() account: AuthAccount,
  ) {
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
  @UseGuards(GqlAuthGuard)
  async archiveOrganization(
    @Args('orgId') orgId: string,
    @CurrentAccount() account: AuthAccount,
  ) {
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
  @UseGuards(GqlAuthGuard)
  async restoreOrganization(
    @Args('orgId') orgId: string,
    @CurrentAccount() account: AuthAccount,
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
  async organizations(@CurrentAccount() account: AuthAccount) {
    const response = await resolveRpcRequest(
      this.rpcClient.getUserMemberships({
        userId: account.id,
      }),
    );

    return response.organizations;
  }

  @Query(() => [OrganizationSchema], {
    description: 'Get current organization',
  })
  @UseGuards(GqlAuthGuard)
  async organization(@AccountActiveOrg() orgId: string): Promise<Organization> {
    const { organization } = await resolveRpcRequest(
      this.rpcClient.getOrg({
        query: {
          $case: 'orgId',
          orgId,
        },
      }),
    );

    return organization;
  }

  @Query(() => OrgMemberSchema, {
    description: 'Get current organization membership',
  })
  @UseGuards(GqlAuthGuard)
  async organizationMembership(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
  ): Promise<Member> {
    const { member } = await resolveRpcRequest(
      this.rpcClient.getMember({
        userId: account.id,
        orgId,
      }),
    );

    return member;
  }

  @Query(() => OrganizationBySlugResponse, {
    description: 'Find organization by slug',
  })
  async organizationBySlug(
    @Args('slug') slug: string,
  ): Promise<Pick<Organization, 'id' | 'name'>> {
    const { organization } = await resolveRpcRequest(
      this.rpcClient.getOrg({
        query: {
          $case: 'orgSlug',
          orgSlug: slug,
        },
      }),
    );

    if (!organization) {
      throw new NotFoundException('Organization not found!');
    }

    return {
      id: organization.id,
      name: organization.name,
    };
  }
}
