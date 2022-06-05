import { Account } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class PhoneVerifiedEvent implements IEvent {
  constructor(
    public readonly data: Account & {
      phoneVerified: string;
    },
  ) {}
}
