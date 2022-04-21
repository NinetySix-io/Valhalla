import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from '@odin/data.models/users';
import { UserSchema } from '@odin/data.models/users/schema';
import { CurrentUser } from '@odin/decorators/current.user.decorator';
import { GqlGuard } from '@odin/guards/gql.passport.guard.decorator';
import { instanceToPlain } from 'class-transformer';
import { UpdateUserInput } from './graphql/update.user.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly users: UsersModel, // @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => UserSchema, { description: 'Get logged in user information' })
  @GqlGuard()
  async whoAmI(@CurrentUser() userId: UserSchema['_id']) {
    const user = await this.users.findById(userId);
    return user.toPublic();
  }

  @Mutation(() => Boolean)
  @GqlGuard()
  async updateUser(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('input') input: UpdateUserInput,
  ): Promise<boolean> {
    const payload = instanceToPlain(input, {
      exposeUnsetFields: false,
    });

    await this.users.updateOne({ _id: userId }, { $set: payload });
    return true;
  }
}
