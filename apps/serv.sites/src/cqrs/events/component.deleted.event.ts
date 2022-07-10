import { Component } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ComponentDeletedEvent implements IEvent {
  constructor(public readonly data: Component & { deletedBy: string }) {}
}
