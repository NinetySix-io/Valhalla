import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { GqlGuard } from '@odin/guards/gql.passport.guard.decorator';
import { OrganizationGuard } from '@odin/guards/organization.guard';
import type { Request } from 'express';
import { ChangeOrganizationRoleInput } from './graphql/change.organization.role.input';

@Resolver()
export class UserAdminOrganizationResolver {
  constructor(private readonly memberships: UserMembershipsModel) {}

  @Mutation(() => Boolean, {
    description: 'Add a user to an organization',
  })
  @GqlGuard(OrganizationGuard)
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
  @GqlGuard(OrganizationGuard)
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
