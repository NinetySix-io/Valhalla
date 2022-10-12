import { ArgsType, Field } from '@nestjs/graphql';

import { UpdateAccountInput } from '../gql.inputs/update.account.input';

@ArgsType()
export class UpdateAccountArgs {
  @Field()
  input: UpdateAccountInput;
}
