import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from '@odin/data.models/users';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { User } from './graphql/user.type';

@Resolver()
export class UsersResolver {
  constructor(private readonly users: UsersModel) {}

  @Query(() => User, { description: 'Get logged in user information' })
  @UseGuards(GraphqlPassportAuthGuard)
  async whoAmI(@CurrentUser() userId: UserSchema['_id']): Promise<User> {
    const user = await this.users.findById(userId);
    return user;
  }
}
