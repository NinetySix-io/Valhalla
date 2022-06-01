import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ForgotPasswordSentEvent implements IEvent {
  constructor(
    public readonly account: Account,
    public readonly resetPasswordLink: string,
  ) {}
}
