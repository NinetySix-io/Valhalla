import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginWithVerificationInput {
  @Field({ description: 'Username' })
  @IsEmail()
  @IsNotEmpty()
  readonly username!: string;

  @Field({ description: 'Verification Code' })
  @IsNotEmpty()
  readonly verificationCode!: string;

  @Field({ description: 'Verification Sent' })
  @IsNotEmpty()
  readonly verificationId!: string;
}
