import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/rpc/protobuf/users';

export class UserRegisteredEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly activationLink?: string,
    public readonly service?: 'local',
  ) {}
}
