import { Account } from '@app/rpc/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountPasswordUpdatedEvent implements IEvent {
  constructor(public readonly account: Account) {}
}
