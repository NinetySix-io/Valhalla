import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrgMemberRequest, DeleteOrgMemberResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteOrgMemberCommand implements ICommand {
  constructor(public readonly input: DeleteOrgMemberRequest) {}
}

@CommandHandler(DeleteOrgMemberCommand)
@RpcHandler()
export class DeleteOrgMemberHandler
  implements ICommandHandler<DeleteOrgMemberCommand, DeleteOrgMemberResponse>
{
  async execute(
    command: DeleteOrgMemberCommand,
  ): Promise<DeleteOrgMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
