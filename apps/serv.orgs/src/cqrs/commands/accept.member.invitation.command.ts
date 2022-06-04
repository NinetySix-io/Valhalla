import {
  AcceptOrgMemberInvitationRequest,
  AcceptOrgMemberInvitationResponse,
} from '@app/protobuf';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class AcceptOrgMemberInvitationCommand implements ICommand {
  constructor(public readonly input: AcceptOrgMemberInvitationRequest) {}
}

@CommandHandler(AcceptOrgMemberInvitationCommand)
@RpcHandler()
export class AcceptOrgMemberInvitationHandler
  implements
    ICommandHandler<
      AcceptOrgMemberInvitationCommand,
      AcceptOrgMemberInvitationResponse
    >
{
  async execute(
    command: AcceptOrgMemberInvitationCommand,
  ): Promise<AcceptOrgMemberInvitationResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
