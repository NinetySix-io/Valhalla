import { AccessTokenSchema } from '@serv.iam/entities/access.tokens/schema';
import { IEvent } from '@nestjs/cqrs';

export class AccessTokenCreatedEvent implements IEvent {
  constructor(public readonly accessToken: AccessTokenSchema) {}
}