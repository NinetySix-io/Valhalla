import { ElementType } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ElementUpdatedEvent implements IEvent {
  constructor(
    public readonly data: {
      elementId: string;
      type: ElementType;
    },
  ) {}
}
