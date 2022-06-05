import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class PhoneRemovedFromAccountEvent implements IEvent {
  constructor(
    public readonly phoneRemoved: string,
    public readonly account: Account,
  ) {}
}
