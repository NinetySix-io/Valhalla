import { ArgsType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ValidateVerificationCodeArgs {
  @Field({ description: 'Verification ID' })
  @IsNotEmpty()
  readonly verificationId!: string;

  @Field({ description: 'Verification Code' })
  @IsNotEmpty()
  readonly verificationCode!: string;
}
