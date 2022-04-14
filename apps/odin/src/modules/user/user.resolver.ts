import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { UserTeamsModel } from '@odin/data.models/user.teams';
import { UsersModel } from '@odin/data.models/users';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { Membership } from './graphql/user.memberships.type';
import { Team } from './graphql/user.teams.type';
import { User } from './graphql/user.type';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly users: UsersModel,
    private readonly organizations: OrganizationsModel,
    private readonly teams: UserTeamsModel,
    private readonly memberships: UserMembershipsModel,
  ) {}

  @Query(() => User, { description: 'Get logged in user information' })
  @UseGuards(GraphqlPassportAuthGuard)
  async whoAmI(@CurrentUser() userId: UserSchema['_id']): Promise<User> {
    const user = await this.users.findById(userId);
    return user;
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

  @Query(() => [Team], {
    description: 'Get teams that the user belongs to',
  })
  @UseGuards(GraphqlPassportAuthGuard)
  async getTeamMembership(@CurrentUser() userId): Promise<Team[]> {
    const teamIdList = await this.memberships.findDistinctGroupByUser(userId);
    const teams = await this.teams.find().where('_id').in(teamIdList);
    const result = teams.map((team) => team.toObject());
    return result;
  }
}
