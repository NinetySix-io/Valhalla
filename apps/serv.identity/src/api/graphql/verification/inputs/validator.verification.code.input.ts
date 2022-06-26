import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ValidateVerificationCodeInput {
  @Field({ description: 'Verification ID' })
  @IsNotEmpty()
  readonly verificationId!: string;

  @Field({ description: 'Verification Code' })
  @IsNotEmpty()
  readonly verificationCode!: string;
}
