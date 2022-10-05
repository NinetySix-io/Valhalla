import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeletePageElementListRequest,
  DeletePageElementListResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { DeleteManyPageElementsCommand } from './delete.many.page.elements.command';
import { PageElementsModel } from '@app/entities/page.elements';
import { Types } from 'mongoose';

export class DeletePageElementListCommand implements ICommand {
  constructor(public readonly request: DeletePageElementListRequest) {}
}

@CommandHandler(DeletePageElementListCommand)
@RpcHandler()
export class DeletePageElementListHandler
  implements
    ICommandHandler<
      DeletePageElementListCommand,
      DeletePageElementListResponse
    >
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly elementsEntity: PageElementsModel,
  ) {}

  async execute(
    command: DeletePageElementListCommand,
  ): Promise<DeletePageElementListResponse> {
    const { sectionId, requestedUserId } = command.request;
    const section = toObjectId(sectionId);
    const elementIds = await this.elementsEntity
      .find({ section })
      .distinct<Types.ObjectId>('_id');

    return this.commandBus.execute(
      new DeleteManyPageElementsCommand({
        requestedUserId,
        elementIdList: elementIds.map((elementId) => String(elementId)),
      }),
    );
  }
}
