import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteMemberRequest,
  DeleteMemberResponse,
} from '@serv.tenants/protobuf/tenants';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteMemberCommand implements ICommand {
  constructor(public readonly input: DeleteMemberRequest) {}
}

@CommandHandler(DeleteMemberCommand)
@RpcHandler()
export class DeleteMemberHandler
  implements ICommandHandler<DeleteMemberCommand, DeleteMemberResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: DeleteMemberCommand): Promise<DeleteMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
