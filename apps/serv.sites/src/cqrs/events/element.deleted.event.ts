import { IEvent } from '@nestjs/cqrs';

export class ElementDeletedEvent implements IEvent {
  constructor(
    public readonly data: {
      elementId: string;
      deletedBy: string;
    },
  ) {}
}
