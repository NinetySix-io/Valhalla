import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InviteOrgMemberRequest, InviteOrgMemberResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class InviteMemberCommand implements ICommand {
  constructor(public readonly input: InviteOrgMemberRequest) {}
}

@CommandHandler(InviteMemberCommand)
@RpcHandler()
export class InviteMemberHandler
  implements ICommandHandler<InviteMemberCommand, InviteOrgMemberResponse>
{
  async execute(
    command: InviteMemberCommand,
  ): Promise<InviteOrgMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
