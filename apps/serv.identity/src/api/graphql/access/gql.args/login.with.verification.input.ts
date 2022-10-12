import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class LoginWithVerificationArgs {
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
