import { IEvent } from '@nestjs/cqrs';
import { User } from '@serv.users/protobuf/users';

export class EmailVerifiedEvent implements IEvent {
  constructor(
    public readonly data: User & {
      emailVerified: string;
    },
  ) {}
}
