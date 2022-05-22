import { UserSchema } from '@app/entities/users/schema';
import { User } from '@app/rpc/protobuf/users';
import { RpcUsersController } from '@app/rpc/users/users.controller';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserLoginInput } from './inputs/login.input';
import { UserRegisterInput } from './inputs/register.input';
import { UserLoginResponse } from './responses/user.login.response';
import { UserRegisterResponse } from './responses/user.register.response';

@Resolver()
export class GqlUserResolver {
  constructor(private readonly rpcClient: RpcUsersController) {}

  @Mutation(() => UserRegisterResponse, { description: 'User Registration' })
  async registerUser(
    @Args('input') input: UserRegisterInput,
  ): Promise<UserRegisterResponse> {
    const result = await this.rpcClient.register(input);
    return result;
  }

  @Mutation(() => UserLoginResponse, { description: 'User Login' })
  async loginUser(
    @Args('input') input: UserLoginInput,
  ): Promise<UserLoginResponse> {
    const result = await this.rpcClient.login(input);
    if (!result.user) {
      throw new Error('Unable to login');
    }

    return {
      session: result.session,
      userId: result.user.id,
    };
  }

  @Query(() => UserSchema, {
    description: 'Get current logged in user information',
  })
  async userProfile(@Context() context: any): Promise<User> {
    console.debug({ context });
    const user = await this.rpcClient.findUser({});
    return user;
  }
}
