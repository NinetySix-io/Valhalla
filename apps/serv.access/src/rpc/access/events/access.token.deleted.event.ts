import { Access } from '@app/protobuf/access';
import { IEvent } from '@nestjs/cqrs';

export class AccessTokenDeletedEvent implements IEvent {
  constructor(public readonly accessToken: Access) {}
}
