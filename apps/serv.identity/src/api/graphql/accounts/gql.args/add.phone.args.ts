import { ArgsType, Field } from '@nestjs/graphql';

import { IsMobilePhone } from 'class-validator';
import { PhoneNumberResolver } from 'graphql-scalars';

@ArgsType()
export class AddPhoneArgs {
  @Field(() => PhoneNumberResolver)
  @IsMobilePhone()
  phone: string;
}
