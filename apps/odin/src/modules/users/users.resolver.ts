import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { User } from './graphql/user.type';

@Resolver()
export class UsersResolver {
  constructor() {}

  @Query(() => User)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }
}
