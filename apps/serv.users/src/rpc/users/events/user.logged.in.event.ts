import { IEvent } from '@nestjs/cqrs';
import { User } from '@serv.users/protobuf/users';

export class UserLoggedInEvent implements IEvent {
  constructor(public readonly user: User) {}
}
