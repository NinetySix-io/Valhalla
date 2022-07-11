import { Element } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ElementCreatedEvent implements IEvent {
  constructor(public readonly data: Element) {}
}
