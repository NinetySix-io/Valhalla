import { IEvent } from '@nestjs/cqrs';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';

export class RefreshTokenDeletedEvent implements IEvent {
  constructor(
    public readonly refreshToken: string,
    public readonly data: Omit<RefreshTokenSchema, '_id'>,
  ) {}
}
