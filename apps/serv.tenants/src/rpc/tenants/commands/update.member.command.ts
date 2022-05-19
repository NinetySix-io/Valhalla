import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateMemberRequest,
  UpdateMemberResponse,
} from '@app/rpc/protobuf/tenants';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateMemberCommand implements ICommand {
  constructor(public readonly input: UpdateMemberRequest) {}
}

@CommandHandler(UpdateMemberCommand)
@RpcHandler()
export class UpdateMemberHandler
  implements ICommandHandler<UpdateMemberCommand, UpdateMemberResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: UpdateMemberCommand): Promise<UpdateMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
