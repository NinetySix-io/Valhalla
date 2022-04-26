import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class UserLoginInput {
  @Field({ description: 'User email address' })
  @IsEmail()
  username: string;

  @Field({ description: 'Password' })
  @IsString()
  @MinLength(7)
  password: string;
}
