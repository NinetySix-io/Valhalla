import { IEvent } from '@nestjs/cqrs';
import { Access } from '@serv.access/protobuf/access';

export class AccessTokenDeletedEvent implements IEvent {
  constructor(public readonly accessToken: Access) {}
}
