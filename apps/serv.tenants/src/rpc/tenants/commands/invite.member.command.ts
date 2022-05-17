import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  InviteMemberRequest,
  InviteMemberResponse,
} from '@app/protobuf/tenants';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class InviteMemberCommand implements ICommand {
  constructor(public readonly input: InviteMemberRequest) {}
}

@CommandHandler(InviteMemberCommand)
@RpcHandler()
export class InviteMemberHandler
  implements ICommandHandler<InviteMemberCommand, InviteMemberResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: InviteMemberCommand): Promise<InviteMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
