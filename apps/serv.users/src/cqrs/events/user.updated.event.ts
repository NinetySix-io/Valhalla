import { IEvent } from '@nestjs/cqrs';
import { UserSchema } from '@serv.users/entities/users/schema';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly user: UserSchema) {}
}
