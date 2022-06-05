import { IEvent } from '@nestjs/cqrs';
import { Verification } from '@app/protobuf';

export class EmailVerificationCreatedEvent implements IEvent {
  constructor(
    public readonly data: {
      verificationId: Verification['id'];
      expiresAt: Date;
      owner?: string;
      email: string;
      code: string;
    },
  ) {}
}
