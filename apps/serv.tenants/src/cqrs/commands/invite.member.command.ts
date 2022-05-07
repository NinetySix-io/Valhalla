import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  InviteMemberRequest,
  InviteMemberResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class InviteMemberCommand implements ICommand {
  constructor(public readonly input: InviteMemberRequest) {}
}

@CommandHandler(InviteMemberCommand)
@RpcHandler()
export class InviteMemberHandler
  implements ICommandHandler<InviteMemberCommand, InviteMemberResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: InviteMemberCommand): Promise<InviteMemberResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
