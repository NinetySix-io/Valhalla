import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountLoggedInEvent implements IEvent {
  constructor(public readonly account: Account) {}
}
