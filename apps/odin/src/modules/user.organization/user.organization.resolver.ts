import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import {
  UserMembershipGroupType,
  UserMembershipRole,
} from '@odin/data.models/user.memberships/schema';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GqlGuard } from '@odin/guards/gql.passport.guard.decorator';
import { UserMembershipType } from './graphql/user.memberships.type';

@Resolver()
export class UserOrganizationResolver {
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @GqlGuard()
  @Query(() => [UserMembershipType], {
    description: 'Get organizations that the user belongs to',
  })
  async getUserOrganizationMemberships(
    @CurrentUser() userId: UserSchema['_id'],
  ): Promise<UserMembershipType[]> {
    const memberships = await this.memberships.find({ user: userId });
    const membershipGroups = memberships.map((mem) => mem.group);
    const organizations = await this.organizations
      .find()
      .where('_id')
      .in(membershipGroups);

    return memberships.map((entry) => {
      const entryId = entry.toObject().id;
      const group = organizations.find((org) => org.toObject().id === entryId);
      return {
        groupType: entry.groupType,
        role: entry.role,
        group: {
          name: group.name,
          avatar: group.logo,
        },
      };
    });
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
