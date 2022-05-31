import { IEvent } from '@nestjs/cqrs';

export class AccountLoggedOutEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
