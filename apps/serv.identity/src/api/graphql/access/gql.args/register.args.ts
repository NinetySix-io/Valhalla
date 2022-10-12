import { ArgsType, Field } from '@nestjs/graphql';

import { AccountRegisterInput } from '../gql.inputs/register.input';

@ArgsType()
export class AccountRegisterArgs {
  @Field()
  input: AccountRegisterInput;
}
