import { ArgsType, Field } from '@nestjs/graphql';

import { LoginWithVerificationInput } from '../gql.inputs/login.with.verification.input';

@ArgsType()
export class LoginWithVerificationArgs {
  @Field()
  input: LoginWithVerificationInput;
}
