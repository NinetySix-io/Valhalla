import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/rpc/protobuf/users';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
