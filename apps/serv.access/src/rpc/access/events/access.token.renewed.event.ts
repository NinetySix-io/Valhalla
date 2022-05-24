import { IEvent } from '@nestjs/cqrs';

export class AccessTokenRenewedEvent implements IEvent {
  constructor(
    public readonly refreshToken: string,
    public readonly accessToken: string,
  ) {}
}
