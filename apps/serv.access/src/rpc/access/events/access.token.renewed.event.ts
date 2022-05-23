import { IEvent } from '@nestjs/cqrs';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';

export class AccessTokenRenewedEvent implements IEvent {
  constructor(
    public readonly refreshToken: string,
    public readonly accessToken: string,
  ) {}
}
