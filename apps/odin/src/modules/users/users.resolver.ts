import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { PaginatedResponse } from '@odin/graphql/types/paginated.response.type';
import { User } from './graphql/user.type';
import { Roles } from '@odin/decorators/roles.decorator';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { UserQueryArgs } from './graphql/pagination.input';

const PaginatedUserResponse = PaginatedResponse(User);
type PaginatedUserResponse = InstanceType<typeof PaginatedUserResponse>;

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedUserResponse)
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users(
    @Args() queryArgs: UserQueryArgs,
  ): Promise<PaginatedUserResponse> {
    return await this.usersService.getUsers(queryArgs);
  }

  @Query(() => User)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }
}
