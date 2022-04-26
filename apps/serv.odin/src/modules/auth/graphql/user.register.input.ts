import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class UserRegisterInput {
  @Field({ description: 'Email Address' })
  @IsEmail()
  readonly email: string;

  @Field({ description: 'Password' })
  @IsString()
  @MinLength(7)
  readonly password: string;
}
