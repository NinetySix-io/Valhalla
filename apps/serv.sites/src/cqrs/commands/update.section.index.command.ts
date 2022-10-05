import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import {
  UpdateSectionIndexRequest,
  UpdateSectionResponse,
} from '@app/protobuf';

import { PagesModel } from '@app/entities/pages';

export class UpdateSectionIndexCommand implements ICommand {
  constructor(public readonly request: UpdateSectionIndexRequest) {}
}

@CommandHandler(UpdateSectionIndexCommand)
@RpcHandler()
export class UpdateSectionIndexHandler
  implements ICommandHandler<UpdateSectionIndexCommand, UpdateSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pagesEntity: PagesModel,
  ) {}

  async execute(
    command: UpdateSectionIndexCommand,
  ): Promise<UpdateSectionResponse> {
    const { index, requestedUserId } = command.request;
    const sectionId = toObjectId(command.request.sectionId);
    const pageId = toObjectId(command.request.pageId);
    throw new Error('');
  }
}
