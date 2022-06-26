import { Verification, VerificationChannel } from '@app/protobuf';

import { IEvent } from '@nestjs/cqrs';

export class VerificationCreatedEvent implements IEvent {
  constructor(
    public readonly data: {
      channel: VerificationChannel;
      verificationId: Verification['id'];
      expiresAt: Date;
      owner?: string;
      code: string;
      destination: string;
    },
  ) {}
}
