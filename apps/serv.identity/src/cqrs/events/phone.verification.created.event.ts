import { IEvent } from '@nestjs/cqrs';
import { Verification } from '@app/protobuf';

export class PhoneVerificationCreatedEvent implements IEvent {
  constructor(
    public readonly data: {
      phone: string;
      code: string;
      expiresAt: Date;
      verificationId: Verification['id'];
      owner?: Verification['owner'];
    },
  ) {}
}
