import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from '@serv.odin/data.models/users';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { CurrentUser } from '@serv.odin/decorators/current.user.decorator';
import { GqlGuard } from '@serv.odin/guards/gql.passport.guard.decorator';
import { ParamValidationPipe } from '@serv.odin/pipes/param.validation';
import {
  EmailParamValidation,
  PhoneParamValidation,
} from '@serv.odin/pipes/param.validation/pre.build';

@Resolver()
export class UsersResolver {
  constructor(private readonly users: UsersModel) {}

  @Query(() => UserSchema, { description: 'Get logged in user information' })
  @GqlGuard()
  async whoAmI(@CurrentUser() userId: UserSchema['_id']) {
    const user = await this.users.findById(userId);
    return user.toPublic();
  }

  @Mutation(() => Boolean)
  @GqlGuard()
  async updateUserEmail(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('email', new ParamValidationPipe([EmailParamValidation]))
    email: string,
  ): Promise<boolean> {
    await this.users.updateOne(
      { _id: userId, email: { $ne: email } },
      { email, emailVerified: false },
    );

    return true;
  }

  @Mutation(() => Boolean)
  @GqlGuard()
  async updateUserPhone(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('phone', new ParamValidationPipe([PhoneParamValidation]))
    phone: string,
  ): Promise<boolean> {
    await this.users.updateOne(
      { _id: userId, phone: { $ne: phone } },
      { phone, phoneVerified: false },
    );

    return true;
  }

  @Mutation(() => Boolean)
  @GqlGuard()
  async updateUserDisplayName(
    @CurrentUser() userId: UserSchema['_id'],
    @Args('displayName')
    displayName: string,
  ): Promise<boolean> {
    await this.users.updateOne({ _id: userId }, { displayName });
    return true;
  }
}