import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeletePageElementListByGroupRequest,
  DeletePageElementListByGroupResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { DeleteManyPageElementsCommand } from './delete.many.page.elements.command';
import { PageElementsModel } from '@app/entities/page.elements';
import { Types } from 'mongoose';

export class DeletePageElementListByGroupCommand implements ICommand {
  constructor(public readonly request: DeletePageElementListByGroupRequest) {}
}

@CommandHandler(DeletePageElementListByGroupCommand)
@RpcHandler()
export class DeletePageElementListByGroupHandler
  implements
    ICommandHandler<
      DeletePageElementListByGroupCommand,
      DeletePageElementListByGroupResponse
    >
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly elementsEntity: PageElementsModel,
  ) {}

  async execute(
    command: DeletePageElementListByGroupCommand,
  ): Promise<DeletePageElementListByGroupResponse> {
    const { groupId, requestedUserId } = command.request;
    const group = toObjectId(groupId);
    const elementIds = await this.elementsEntity
      .find({ group })
      .orFail(() => new Error('Group does not exists!'))
      .distinct<Types.ObjectId>('_id');

    return this.commandBus.execute(
      new DeleteManyPageElementsCommand({
        requestedUserId,
        elementIdList: elementIds.map((elementId) => String(elementId)),
      }),
    );
  }
}
