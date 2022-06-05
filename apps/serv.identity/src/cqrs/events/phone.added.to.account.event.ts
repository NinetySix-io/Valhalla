import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class PhoneAddedToAccountEvent implements IEvent {
  constructor(
    public readonly phoneAdded: string,
    public readonly account: Account,
  ) {}
}
