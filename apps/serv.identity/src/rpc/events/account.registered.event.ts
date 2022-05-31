import { Account } from '@app/rpc/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountRegisteredEvent implements IEvent {
  constructor(
    public readonly account: Account,
    public readonly service?: 'local',
  ) {}
}
