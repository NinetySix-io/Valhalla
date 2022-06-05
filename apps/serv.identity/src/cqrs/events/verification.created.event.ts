import { IEvent } from '@nestjs/cqrs';
import { Verification } from '@app/protobuf';

export class VerificationCreatedEvent implements IEvent {
  constructor(public readonly verificationId: Verification) {}
}
