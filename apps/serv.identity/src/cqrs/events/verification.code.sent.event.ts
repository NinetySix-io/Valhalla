import { Verification, VerificationChannel } from '@app/protobuf';

import { IEvent } from '@nestjs/cqrs';

export class VerificationCodeSentEvent implements IEvent {
  constructor(
    public readonly data: {
      verificationId: Verification['id'];
      channel: VerificationChannel;
    },
  ) {}
}
