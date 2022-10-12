import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';

import { Account } from '../../accounts/gql.types/account';
import { IsOptional } from 'class-validator';

@InputType()
export class AccountRegisterInput extends PartialType(
  PickType(
    Account,
    ['firstName', 'lastName', 'displayName'] as const,
    InputType,
  ),
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
