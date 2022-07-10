import { Component } from '@app/protobuf';
import { IEvent } from '@nestjs/cqrs';

export class ComponentUpdatedEvent implements IEvent {
  constructor(public readonly data: Component) {}
}
