import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTenantRequest, DeleteTenantResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteTenantCommand implements ICommand {
  constructor(public readonly input: DeleteTenantRequest) {}
}

@CommandHandler(DeleteTenantCommand)
@RpcHandler()
export class DeleteTenantHandler
  implements ICommandHandler<DeleteTenantCommand, DeleteTenantResponse>
{
  async execute(command: DeleteTenantCommand): Promise<DeleteTenantResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
