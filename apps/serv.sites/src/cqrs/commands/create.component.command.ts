import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateComponentRequest,
  CreateComponentResponse,
  EditStatus,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentCreatedEvent } from '../events/component.created.event';
import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

export class CreateComponentCommand implements ICommand {
  constructor(public readonly request: CreateComponentRequest) {}
}

@CommandHandler(CreateComponentCommand)
@RpcHandler()
export class CreateComponentHandler
  implements ICommandHandler<CreateComponentCommand, CreateComponentResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Components: ComponentsModel,
  ) {}

  async execute(
    command: CreateComponentCommand,
  ): Promise<CreateComponentResponse> {
    const { requestedUserId, ownerIdList, name, elements, status, isHidden } =
      command.request;

    const createdBy = toObjectId(requestedUserId);
    const result = await this.Components.create({
      owners: ownerIdList,
      name,
      elements,
      createdBy,
      updatedBy: createdBy,
      status: status || EditStatus.DRAFT,
      isHidden,
    });

    const serialized = new ComponentTransformer(result).proto;
    this.eventBus.publish(new ComponentCreatedEvent(serialized));

    return {
      componentId: result.id,
    };
  }
}
