import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class EmailRemovedFromAccountEvent implements IEvent {
  constructor(
    public readonly emailRemoved: string,
    public readonly account: Account,
  ) {}
}
