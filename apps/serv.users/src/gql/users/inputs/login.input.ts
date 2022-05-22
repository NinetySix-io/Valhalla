import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserLoginInput {
  @Field({ description: 'Email address or phone number' })
  @IsEmail()
  @IsNotEmpty()
  readonly username: string;

  @Field({ description: 'Password' })
  @IsNotEmpty()
  readonly password: string;
}
