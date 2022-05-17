import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/protobuf/users';

export class EmailVerificationSentEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly activationLink?: string,
  ) {}
}
