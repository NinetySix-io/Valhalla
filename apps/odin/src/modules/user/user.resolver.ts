import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { UsersModel } from '@odin/data.models/users';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { Membership } from './graphql/user.memberships.type';
import { User } from './graphql/user.type';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly users: UsersModel,
    private readonly organizations: OrganizationsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @Query(() => User, { description: 'Get logged in user information' })
  @UseGuards(GraphqlPassportAuthGuard)
  async whoAmI(@CurrentUser() userId: UserSchema['_id']): Promise<User> {
    const user = await this.users.findById(userId);
    const result = user.toObject();
    return result;
  }

  @Query(() => [Membership], {
    description: 'Get organizations that the user belongs to',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  async getOrganizationMemberships(
    @CurrentUser() userId: UserSchema['_id'],
  ): Promise<Membership[]> {
    const orgIdList = await this.memberships.findDistinctGroupByUser(userId);
    const organizations = await this.organizations
      .find()
      .where('_id')
      .in(orgIdList);

    const result = organizations.map((org) => org.toObject());
    return result;
  }
}
