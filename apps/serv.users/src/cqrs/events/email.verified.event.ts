import { IEvent } from '@nestjs/cqrs';
import { UserSchema } from '@serv.users/entities/users/schema';

export class EmailVerifiedEvent implements IEvent {
  constructor(
    public readonly data: UserSchema & {
      emailVerified: string;
    },
  ) {}
}
