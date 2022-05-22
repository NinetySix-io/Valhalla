import { RpcUsersController } from '@app/rpc/users/users.controller';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserLoginInput } from './inputs/login.input';
import { UserRegisterInput } from './inputs/register.input';
import { UserLoginResponse } from './responses/user.login.response';
import { UserRegisterResponse } from './responses/user.register.response';

@Resolver()
export class GqlUserResolver {
  constructor(private readonly rpcClient: RpcUsersController) {}

  @Mutation(() => UserRegisterResponse, { description: 'User Registration' })
  async userRegister(
    @Args('input') input: UserRegisterInput,
  ): Promise<UserRegisterResponse> {
    const result = await this.rpcClient.register(input);
    return result;
  }

  @Mutation(() => UserLoginResponse, { description: 'User Login' })
  async userLogin(
    @Args('input') input: UserLoginInput,
  ): Promise<UserLoginResponse> {
    const result = await this.rpcClient.login({ params: input });
    return {
      session: result.session,
      userId: result.user.id,
    };
  }
}
