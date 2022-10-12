import { gRpcController } from '@app/grpc/grpc.controller';
import { OrgPlan } from '@app/protobuf';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  EmptyStringValidation,
  GqlAuthGuard,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { ArchiveOrgArgs } from './gql.args/archive.org.args';
import { CreateOrganizationArgs } from './gql.args/create.org.args';
import { RestoreOrgArgs } from './gql.args/restore.org.args';
import { OrganizationBySlugResponse } from './gql.responses/org.by.slug.response';
import { Organization } from './gql.types/organization';
import { OrganizationMember } from './gql.types/organization.member';
import { VoidResolver } from 'graphql-scalars';
import { OrgCreatedResponse } from './gql.responses/org.created.response';
@Resolver()
export class GqlOrganizationsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => OrgCreatedResponse, { description: 'Create an organization' })
  @UseGuards(GqlAuthGuard)
  async createOrganization(
    @Args() args: CreateOrganizationArgs,
    @CurrentAccount() account: AuthAccount,
  ): Promise<OrgCreatedResponse> {
    const response = await resolveRpcRequest(
      this.rpcClient.createOrg({
        requestedUserId: account.id,
        name: args.input.name,
        plan: args.input.plan ?? OrgPlan.FREE,
      }),
    );

    return response;
  }

  @Mutation(() => VoidResolver, { description: 'Archive an organization' })
  @UseGuards(GqlAuthGuard)
  async archiveOrganization(
    @CurrentAccount() account: AuthAccount,
    @Args() args: ArchiveOrgArgs,
  ): Promise<void> {
    await resolveRpcRequest(
      this.rpcClient.archiveOrg({
        requestedUserId: account.id,
        orgId: args.orgId,
      }),
    );
  }

  @Mutation(() => VoidResolver, {
    description: 'Restore an organization that was archived',
  })
  @UseGuards(GqlAuthGuard)
  async restoreOrganization(
    @CurrentAccount() account: AuthAccount,
    @Args() args: RestoreOrgArgs,
  ): Promise<void> {
    await resolveRpcRequest(
      this.rpcClient.restoreOrg({
        requestedUserId: account.id,
        orgId: args.orgId,
      }),
    );
  }

  @Query(() => [Organization], {
    description: "Get current user's organizations memberships",
  })
  @UseGuards(GqlAuthGuard)
  async organizationsByMemberships(
    @CurrentAccount() account: AuthAccount,
  ): Promise<Organization[]> {
    const response = await resolveRpcRequest(
      this.rpcClient.getUserMemberships({
        userId: account.id,
      }),
    );

    return response.organizations;
  }

  @Query(() => Organization, {
    description: 'Get current organization',
  })
  @UseGuards(GqlAuthGuard)
  async organizationByMembership(
    @AccountActiveOrg() orgId: string,
  ): Promise<Organization> {
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

  @Query(() => OrganizationMember, {
    description: 'Get current organization membership',
  })
  @UseGuards(GqlAuthGuard)
  async organizationMembershipProfile(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
  ): Promise<OrganizationMember> {
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
    @Args('slug', new ParamValidationPipe([EmptyStringValidation]))
    slug: string,
  ): Promise<OrganizationBySlugResponse> {
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
