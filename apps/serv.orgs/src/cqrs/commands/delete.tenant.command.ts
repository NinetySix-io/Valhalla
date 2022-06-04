import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrgRequest, DeleteOrgResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteOrgCommand implements ICommand {
  constructor(public readonly input: DeleteOrgRequest) {}
}

@CommandHandler(DeleteOrgCommand)
@RpcHandler()
export class DeleteOrgHandler
  implements ICommandHandler<DeleteOrgCommand, DeleteOrgResponse>
{
  async execute(command: DeleteOrgCommand): Promise<DeleteOrgResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
