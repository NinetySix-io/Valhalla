import { Account, CreateAccessResponse } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { AccessTokenCreatedEvent } from '../events/access.token.created.event';
import { RpcHandler } from '@valhalla/serv.core';

export class CreateAccessCommand implements ICommand {
  constructor(public readonly input: Account) {}
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
    const tokenData = await this.provision.createRefreshToken(command.input);

    this.eventBus.publish(
      new AccessTokenCreatedEvent(
        tokenData.refreshToken,
        tokenData.accessToken,
      ),
    );

    return {
      refreshToken: tokenData.refreshToken,
      accessToken: tokenData.accessToken,
      accessTokenExpiresAt: tokenData.accessTokenExpiresAt.toString(),
    };
  }
}
