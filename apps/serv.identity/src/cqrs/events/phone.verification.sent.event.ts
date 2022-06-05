import { IEvent } from '@nestjs/cqrs';
import { Verification } from '@app/protobuf';

export class PhoneVerificationSentEvent implements IEvent {
  constructor(public readonly verificationId: Verification['id']) {}
}
