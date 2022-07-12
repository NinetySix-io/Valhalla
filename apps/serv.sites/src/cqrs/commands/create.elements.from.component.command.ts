import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateElementsFromComponentRequest,
  CreateElementsFromComponentResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentsModel } from '@app/entities/components';
import { CreateManyElementsCommand } from './create.many.elements.command';
import { ElementsModel } from '@app/entities/elements';

export class CreateElementsFromComponentCommand implements ICommand {
  constructor(public readonly request: CreateElementsFromComponentRequest) {}
}

@CommandHandler(CreateElementsFromComponentCommand)
@RpcHandler()
export class CreateElementsFromComponentHandler
  implements
    ICommandHandler<
      CreateElementsFromComponentCommand,
      CreateElementsFromComponentResponse
    >
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly Components: ComponentsModel,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(
    command: CreateElementsFromComponentCommand,
  ): Promise<CreateElementsFromComponentResponse> {
    const { componentId, owners, parent, requestedUserId, componentOwnerId } =
      command.request;

    const component = await this.Components.findOne({
      _id: componentId,
      ownBy: toObjectId(componentOwnerId),
    })
      .lean()
      .orFail();

    const elements = await this.Elements.find({})
      .where('owners')
      .equals([component.id])
      .lean();

    await this.commandBus.execute(
      new CreateManyElementsCommand({
        elements: elements.map((element) => ({
          owners,
          requestedUserId,
          type: element.type,
          props: element.props,
          isRoot: element.isRoot,
          parent: element.isRoot ? parent : element.parent,
        })),
      }),
    );

    return {};
  }
}
