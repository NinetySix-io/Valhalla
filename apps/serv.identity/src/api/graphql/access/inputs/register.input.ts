import { Field, InputType, PickType } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { AccountSchema } from '@app/entities/accounts/schema';

@InputType()
export class AccountRegisterInput extends PickType(AccountSchema, [
  'firstName',
  'lastName',
  'displayName',
]) {
  @Field({ description: 'Email Address' })
  @IsEmail()
  readonly email!: string;

  @Field({ description: 'Phone Number', nullable: true })
  @IsOptional()
  @IsMobilePhone()
  readonly phone?: string;

  @Field({ description: 'password' })
  @IsNotEmpty()
  readonly password!: string;
}
