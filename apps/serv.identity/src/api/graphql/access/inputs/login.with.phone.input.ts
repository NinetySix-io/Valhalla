import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class LoginWithPhoneInput {
  @Field({ description: 'Phone number' })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone!: string;

  @Field({ description: 'Verification Code' })
  @IsNotEmpty()
  readonly verificationCode!: string;

  @Field({ description: 'Verification Sent' })
  @IsNotEmpty()
  readonly verificationId!: string;
}
