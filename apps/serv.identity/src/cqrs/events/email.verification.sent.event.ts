import { IEvent } from '@nestjs/cqrs';

export class EmailVerificationSentEvent implements IEvent {
  constructor(public readonly verificationId: string) {}
}
