import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginWithEmailInput {
  @Field({ description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @Field({ description: 'Verification Code' })
  @IsNotEmpty()
  readonly verificationCode!: string;

  @Field({ description: 'Verification Sent' })
  @IsNotEmpty()
  readonly verificationId!: string;
}
