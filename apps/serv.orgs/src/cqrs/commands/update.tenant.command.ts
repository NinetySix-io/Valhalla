import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrgRequest, UpdateOrgResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateOrgCommand implements ICommand {
  constructor(public readonly input: UpdateOrgRequest) {}
}

@CommandHandler(UpdateOrgCommand)
@RpcHandler()
export class UpdateOrgHandler
  implements ICommandHandler<UpdateOrgCommand, UpdateOrgResponse>
{
  async execute(command: UpdateOrgCommand): Promise<UpdateOrgResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
