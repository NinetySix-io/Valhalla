import { RpcUsersController } from '@app/rpc/users/users.controller';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRegisterInput } from './inputs/register.input';

@Resolver()
export class GqlUserResolver {
  constructor(private readonly rpcClient: RpcUsersController) {}

  @Mutation(() => Boolean, { description: 'Register User' })
  async userRegister(@Args('input') input: UserRegisterInput) {
    await this.rpcClient.register({
      firstName: 'test',
      lastName: 'test',
      displayName: input.email,
      email: input.email,
      password: input.password,
      phone: '',
    });

    return true;
  }

  @Query(() => String, { description: 'Get user by id' })
  async getUser(): Promise<string> {
    return '';
  }
}
