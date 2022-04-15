import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import {
  UserMembershipGroupType,
  UserMembershipRole,
} from '@odin/data.models/user.memberships/schema';
import type { Request } from 'express';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { OrganizationGuard } from '@odin/guards/organization.guard';
import { ChangeOrganizationRoleInput } from './graphql/change.organization.role.input';

@Resolver()
export class OrganizationResolver {
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @Mutation(() => Boolean, { description: 'Create an organization' })
  @UseGuards(GraphqlPassportAuthGuard)
  async createOrganization(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('name') name: string,
  ): Promise<boolean> {
    const org = await this.organizations.create({ name });
    await this.memberships.create({
      user: userId,
      group: org._id,
      groupType: UserMembershipGroupType.ORGANIZATION,
      role: UserMembershipRole.OWNER,
    });

    return true;
  }

  @Mutation(() => Boolean, {
    description: 'Add a user to an organization',
  })
  @UseGuards(GraphqlPassportAuthGuard, OrganizationGuard)
  async addOrganizationMember(
    @Context('req') request: Request,
    @Args('input') input: ChangeOrganizationRoleInput,
  ): Promise<boolean> {
    await this.memberships.updateOne(
      { user: input.user, group: request.organization },
      { $set: { role: input.role } },
      { upsert: true },
    );

    return true;
  }

  @Mutation(() => Boolean, {
    description: 'Update a user role within an organization',
  })
  @UseGuards(GraphqlPassportAuthGuard, OrganizationGuard)
  async changeOrganizationRole(
    @Context('req') request: Request,
    @Args('input') input: ChangeOrganizationRoleInput,
  ): Promise<boolean> {
    await this.memberships.updateOne(
      { user: input.user, group: request.organization },
      { $set: { role: input.role } },
    );

    return true;
  }
}
