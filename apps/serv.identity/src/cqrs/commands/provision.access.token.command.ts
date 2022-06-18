import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
} from '@app/protobuf';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { AccessTokenRenewedEvent } from '../events/access.token.renewed.event';
import { RpcHandler } from '@valhalla/serv.core';

export class ProvisionAccessTokenCommand implements ICommand {
  constructor(public readonly input: ProvisionAccessTokenRequest) {}
}

@CommandHandler(ProvisionAccessTokenCommand)
@RpcHandler()
export class ProvisionAccessTokenHandler
  implements
    ICommandHandler<ProvisionAccessTokenCommand, ProvisionAccessTokenResponse>
{
  constructor(
    private readonly provision: AccessProvisionService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: ProvisionAccessTokenCommand,
  ): Promise<ProvisionAccessTokenResponse> {
    const refreshToken = command.input.refreshToken;
    const accessToken = await this.provision.renewAccessToken(refreshToken, {
      organization: command.input.organization,
    });

    this.eventBus.publish(
      new AccessTokenRenewedEvent(refreshToken, accessToken.value),
    );

    return {
      accessToken: accessToken.value,
      accessTokenExpiresAt: accessToken.expiresAt.toString(),
    };
  }
}
