import { IEvent } from '@nestjs/cqrs';
import { User } from '@serv.users/protobuf/users';

export class UserPasswordUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
