import { ArgsType, Field, PartialType, PickType } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';

import { Account } from '../../accounts/gql.types/account';
import { IsOptional } from 'class-validator';

@ArgsType()
export class AccountRegisterArgs extends PartialType(
  PickType(Account, ['firstName', 'lastName', 'displayName'], ArgsType),
) {
  @Field(() => EmailAddressResolver, { description: 'Email Address' })
  readonly email!: string;

  @Field(() => PhoneNumberResolver, {
    description: 'Phone Number',
    nullable: true,
  })
  @IsOptional()
  readonly phone?: string;
}
