import { IEvent } from '@nestjs/cqrs';
import { Token } from '@app/protobuf';

export class RefreshTokenCreatedEvent implements IEvent {
  constructor(
    public readonly data: {
      refreshToken: Token;
      account: string;
    },
  ) {}
}
