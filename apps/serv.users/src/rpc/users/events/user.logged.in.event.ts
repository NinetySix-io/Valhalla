import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/protobuf/users';

export class UserLoggedInEvent implements IEvent {
  constructor(public readonly user: User) {}
}
