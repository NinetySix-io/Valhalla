import { Account } from '@app/rpc/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class AccountLoggedInEvent implements IEvent {
  constructor(
    public readonly account: Account,
    public readonly tokens: {
      accessToken: string;
      refreshToken: string;
    },
  ) {}
}
