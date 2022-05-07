import {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
} from '@serv.tenants/protobuf/tenants';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class AcceptMemberInvitationCommand implements ICommand {
  constructor(public readonly input: AcceptMemberInvitationRequest) {}
}

@CommandHandler(AcceptMemberInvitationCommand)
@RpcHandler()
export class AcceptMemberInvitationHandler
  implements
    ICommandHandler<
      AcceptMemberInvitationCommand,
      AcceptMemberInvitationResponse
    >
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(
    command: AcceptMemberInvitationCommand,
  ): Promise<AcceptMemberInvitationResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
