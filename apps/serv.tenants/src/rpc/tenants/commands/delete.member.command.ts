import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMemberRequest, DeleteMemberResponse } from '@app/rpc/protobuf';

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
  async execute(command: DeleteMemberCommand): Promise<DeleteMemberResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
