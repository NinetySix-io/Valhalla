import { Access } from '@app/rpc/protobuf/access';
import { IEvent } from '@nestjs/cqrs';

export class AccessTokenDeletedEvent implements IEvent {
  constructor(public readonly accessToken: Access) {}
}
