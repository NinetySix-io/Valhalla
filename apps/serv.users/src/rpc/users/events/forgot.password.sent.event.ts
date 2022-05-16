import { IEvent } from '@nestjs/cqrs';
import { User } from '@serv.users/protobuf/users';

export class ForgotPasswordSentEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly resetPasswordLink: string,
  ) {}
}
