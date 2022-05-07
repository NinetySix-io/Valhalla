import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateMemberRequest,
  UpdateMemberResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateMemberCommand implements ICommand {
  constructor(public readonly input: UpdateMemberRequest) {}
}

@CommandHandler(UpdateMemberCommand)
@RpcHandler()
export class UpdateMemberHandler
  implements ICommandHandler<UpdateMemberCommand, UpdateMemberResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: UpdateMemberCommand): Promise<UpdateMemberResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
