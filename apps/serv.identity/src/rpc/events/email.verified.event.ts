import { Account } from '@app/rpc/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
  constructor(
    public readonly data: Account & {
      emailVerified: string;
    },
  ) {}
}
