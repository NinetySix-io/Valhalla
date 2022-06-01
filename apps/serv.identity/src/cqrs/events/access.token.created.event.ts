import { IEvent } from '@nestjs/cqrs';

export class AccessTokenCreatedEvent implements IEvent {
  constructor(
    public readonly refreshToken: string,
    public readonly accessToken: string,
  ) {}
}
