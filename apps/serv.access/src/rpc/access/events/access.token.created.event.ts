import { Access } from '@app/rpc/protobuf/access';
import { IEvent } from '@nestjs/cqrs';

export class AccessTokenCreatedEvent implements IEvent {
  constructor(public readonly accessToken: Access) {}
}
