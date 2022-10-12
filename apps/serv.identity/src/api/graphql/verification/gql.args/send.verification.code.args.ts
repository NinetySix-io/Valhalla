import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

import { IsEmailOrPhone } from '@valhalla/serv.core';
import { VerificationChannel } from '@app/protobuf';

registerEnumType(VerificationChannel, { name: 'VerificationChannel' });

@ArgsType()
export class SendVerificationCodeArgs {
  @Field({ description: 'Sending verification code target' })
  @IsEmailOrPhone()
  readonly destination!: string;

  @Field(() => VerificationChannel, { description: 'Verification channel' })
  readonly channel!: VerificationChannel;
}
