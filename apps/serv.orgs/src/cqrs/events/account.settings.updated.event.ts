import { IEvent } from '@nestjs/cqrs';

export class AccountSettingsUpdatedEvent implements IEvent {
  constructor(
    public readonly accountId: string,
    public readonly changedProperty: {
      name: string;
      value: unknown;
    },
  ) {}
}
