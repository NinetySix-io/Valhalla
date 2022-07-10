import {
  ArchiveComponentRequest,
  ArchiveComponentResponse,
  EditStatus,
} from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentArchivedEvent } from '../events/component.archived.event';
import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

export class ArchiveComponentCommand implements ICommand {
  constructor(public readonly request: ArchiveComponentRequest) {}
}

@CommandHandler(ArchiveComponentCommand)
@RpcHandler()
export class ArchiveComponentHandler
  implements ICommandHandler<ArchiveComponentCommand, ArchiveComponentResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Components: ComponentsModel,
  ) {}

  async execute(
    command: ArchiveComponentCommand,
  ): Promise<ArchiveComponentResponse> {
    const { componentId, ownerIdList, requestedUserId } = command.request;
    const _id = toObjectId(componentId);
    const updatedBy = toObjectId(requestedUserId);
    const status = EditStatus.ARCHIVED;
    const result = await this.Components.findOneAndUpdate(
      {
        _id,
        owners: ownerIdList,
      },
      {
        $set: {
          updatedBy,
          status,
        },
      },
      {
        new: true,
      },
    )
      .select({ elements: 0 })
      .orFail();

    const serialized = new ComponentTransformer(result).proto;
    const event = new ComponentArchivedEvent(serialized);
    this.eventBus.publish(event);
    return {};
  }
}
