import { ArgsType, Field } from '@nestjs/graphql';

import { EmailAddressResolver } from 'graphql-scalars';
import { IsEmail } from 'class-validator';

@ArgsType()
export class AddEmailArgs {
  @Field(() => EmailAddressResolver)
  @IsEmail()
  email: string;
}
