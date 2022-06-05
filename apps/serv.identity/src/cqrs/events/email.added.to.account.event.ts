import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class EmailAddedToAccountEvent implements IEvent {
  constructor(
    public readonly emailAdded: string,
    public readonly account: Account,
  ) {}
}
