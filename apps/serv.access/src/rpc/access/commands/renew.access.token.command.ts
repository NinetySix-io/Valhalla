import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  RenewAccessTokenRequest,
  RenewAccessTokenResponse,
} from '@app/rpc/protobuf/access';

import { AccessProvisionService } from '@app/services/access.provision.service';
import { AccessTokenRenewedEvent } from '../events/access.token.renewed.event';
import { RpcHandler } from '@valhalla/serv.core';

export class RenewAccessTokenCommand implements ICommand {
  constructor(public readonly input: RenewAccessTokenRequest) {}
}

@CommandHandler(RenewAccessTokenCommand)
@RpcHandler()
export class RenewAccessTokenHandler
  implements ICommandHandler<RenewAccessTokenCommand, RenewAccessTokenResponse>
{
  constructor(
    private readonly provision: AccessProvisionService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: RenewAccessTokenCommand,
  ): Promise<RenewAccessTokenResponse> {
    const refreshToken = command.input.refreshToken;
    const accessToken = await this.provision.renewAccessToken(refreshToken);
    const event = new AccessTokenRenewedEvent(refreshToken, accessToken);
    this.eventBus.publish(event);

    return {
      accessToken,
    };
  }
}
