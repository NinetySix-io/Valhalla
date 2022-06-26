import { Field, InputType } from '@nestjs/graphql';

import { IsEmailOrPhone } from '@valhalla/serv.core';
import { VerificationChannel } from '@app/protobuf';

@InputType()
export class SendVerificationCodeInput {
  @Field({ description: 'Sending verification code target' })
  @IsEmailOrPhone()
  readonly destination!: string;

  @Field(() => VerificationChannel, { description: 'Verification channel' })
  readonly channel!: VerificationChannel;
}
