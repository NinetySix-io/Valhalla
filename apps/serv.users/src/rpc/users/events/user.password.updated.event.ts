import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/rpc/protobuf/users';

export class UserPasswordUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
