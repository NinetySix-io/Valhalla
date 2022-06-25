import { IEvent } from '@nestjs/cqrs';
import { Page } from '@app/protobuf';

export class PageDeletedEventEvent implements IEvent {
  constructor(
    public readonly data: Page & {
      requestedUserId: string;
    },
  ) {}
}
