import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountUpdatedEvent implements IEvent {
  constructor(public readonly account: Account) {}
}
