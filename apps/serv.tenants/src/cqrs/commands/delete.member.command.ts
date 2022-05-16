import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteMemberRequest,
  DeleteMemberResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteMemberCommand implements ICommand {
  constructor(public readonly input: DeleteMemberRequest) {}
}

@CommandHandler(DeleteMemberCommand)
@RpcHandler()
export class DeleteMemberHandler
  implements ICommandHandler<DeleteMemberCommand, DeleteMemberResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: DeleteMemberCommand): Promise<DeleteMemberResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
