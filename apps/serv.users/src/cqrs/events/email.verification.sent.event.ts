import { IEvent } from '@nestjs/cqrs';
import { UserSchema } from '@serv.users/entities/users/schema';

export class EmailVerificationSentEvent implements IEvent {
  constructor(
    public readonly user: UserSchema,
    public readonly activationLink?: string,
  ) {}
}
