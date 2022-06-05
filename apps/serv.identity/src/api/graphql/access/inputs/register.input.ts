import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';

import { AccountSchema } from '@app/entities/accounts/schema';

@InputType()
export class RegisterInput extends PartialType(
  PickType(AccountSchema, ['firstName', 'lastName', 'displayName'], InputType),
) {
  @Field({ description: 'Email Address' })
  @IsEmail()
  readonly email!: string;

  @Field({ description: 'Phone Number', nullable: true })
  @IsOptional()
  @IsMobilePhone()
  readonly phone?: string;
}
