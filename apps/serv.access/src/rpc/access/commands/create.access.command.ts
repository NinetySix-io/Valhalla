import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateAccessRequest,
  CreateAccessResponse,
} from '@app/rpc/protobuf/access';

import { AccessProvisionService } from '@app/services/access.provision.service';
import { AccessTokenCreatedEvent } from '../events/access.token.created.event';
import { RpcHandler } from '@valhalla/serv.core';

export class CreateAccessCommand implements ICommand {
  constructor(public readonly input: CreateAccessRequest) {}
}

@CommandHandler(CreateAccessCommand)
@RpcHandler()
export class CreateAccessHandler
  implements ICommandHandler<CreateAccessCommand, CreateAccessResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly provision: AccessProvisionService,
  ) {}

  async execute(command: CreateAccessCommand): Promise<CreateAccessResponse> {
    const tokenData = await this.provision.createAccessToken(command.input);
    const event = new AccessTokenCreatedEvent(
      tokenData.refreshToken,
      tokenData.accessToken,
    );
    this.eventBus.publish(event);
    return tokenData;
  }
}
