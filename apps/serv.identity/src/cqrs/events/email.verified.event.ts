import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
  constructor(
    public readonly data: Account & {
      emailVerified: string;
    },
  ) {}
}
