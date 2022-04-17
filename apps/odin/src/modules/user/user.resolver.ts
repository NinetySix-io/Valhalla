import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { OrganizationSchema } from '@odin/data.models/organizations/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { UsersModel } from '@odin/data.models/users';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly users: UsersModel,
    private readonly organizations: OrganizationsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @Query(() => UserSchema, { description: 'Get logged in user information' })
  @UseGuards(GraphqlPassportAuthGuard)
  async whoAmI(@CurrentUser() userId: UserSchema['_id']) {
    const user = await this.users.findById(userId);
    return user.toPublic();
  }

  @Query(() => [OrganizationSchema], {
    description: 'Get organizations that the user belongs to',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  async getOrganizationMemberships(@CurrentUser() userId: UserSchema['_id']) {
    const orgIdList = await this.memberships.findDistinctGroupByUser(userId);
    const organizations = await this.organizations
      .find()
      .where('_id')
      .in(orgIdList);

    return organizations.map((org) => org.toPublic());
  }
}
