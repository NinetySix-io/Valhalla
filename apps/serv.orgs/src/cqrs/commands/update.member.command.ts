import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrgMemberRequest, UpdateOrgMemberResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateMemberCommand implements ICommand {
  constructor(public readonly input: UpdateOrgMemberRequest) {}
}

@CommandHandler(UpdateMemberCommand)
@RpcHandler()
export class UpdateMemberHandler
  implements ICommandHandler<UpdateMemberCommand, UpdateOrgMemberResponse>
{
  async execute(
    command: UpdateMemberCommand,
  ): Promise<UpdateOrgMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
