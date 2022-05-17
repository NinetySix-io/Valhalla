import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/protobuf/users';

export class UserRegisteredEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly activationLink?: string,
    public readonly service?: 'local',
  ) {}
}
