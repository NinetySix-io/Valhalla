import { Field, InputType, PickType } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { UserSchema } from '@app/entities/users/schema';

@InputType()
export class UserRegisterInput extends PickType(UserSchema, [
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
