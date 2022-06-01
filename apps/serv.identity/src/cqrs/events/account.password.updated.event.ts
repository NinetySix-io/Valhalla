import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountPasswordUpdatedEvent implements IEvent {
  constructor(public readonly account: Account) {}
}
