import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { OrganizationSchema } from '@odin/data.models/organizations/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import {
  UserMembershipGroupType,
  UserMembershipRole,
} from '@odin/data.models/user.memberships/schema';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GqlGuard } from '@odin/guards/gql.passport.guard.decorator';

@Resolver()
export class UserOrganizationResolver {
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @GqlGuard()
  @Query(() => [OrganizationSchema], {
    description: 'Get organizations that the user belongs to',
  })
  async getUserOrganizationMemberships(
    @CurrentUser() userId: UserSchema['_id'],
  ) {
    const orgIdList = await this.memberships.findDistinctGroupByUser(userId);
    const organizations = await this.organizations
      .find()
      .where('_id')
      .in(orgIdList);

    return organizations.map((org) => org.toPublic());
  }

  @Mutation(() => Boolean, { description: 'Create an organization' })
  @GqlGuard()
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
}
