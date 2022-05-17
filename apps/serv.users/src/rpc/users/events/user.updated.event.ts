import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/protobuf/users';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
