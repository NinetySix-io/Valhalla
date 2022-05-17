import {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
} from '@app/protobuf/tenants';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';
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
  constructor(private readonly eventBus: EventBus) {}

  async execute(
    command: AcceptMemberInvitationCommand,
  ): Promise<AcceptMemberInvitationResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
