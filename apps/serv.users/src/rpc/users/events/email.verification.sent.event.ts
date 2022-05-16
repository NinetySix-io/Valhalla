import { IEvent } from '@nestjs/cqrs';
import { User } from '@serv.users/protobuf/users';

export class EmailVerificationSentEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly activationLink?: string,
  ) {}
}
