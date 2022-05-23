import { IEvent } from '@nestjs/cqrs';

export class UserLoggedOutEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
