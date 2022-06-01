import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class EmailVerificationSentEvent implements IEvent {
  constructor(
    public readonly account: Account,
    public readonly activationLink?: string,
  ) {}
}
