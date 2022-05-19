import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/rpc/protobuf/users';

export class EmailVerifiedEvent implements IEvent {
  constructor(
    public readonly data: User & {
      emailVerified: string;
    },
  ) {}
}
