import { Element } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ElementDeletedEvent implements IEvent {
  constructor(public readonly data: Element & { deletedBy: string }) {}
}
