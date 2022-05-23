import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
} from '@app/rpc/protobuf/access';

import { AccessProvisionService } from '@app/services/access.provision.service';
import { RefreshTokenDeletedEvent } from '../events/refresh.token.deleted.event';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteRefreshTokenCommand implements ICommand {
  constructor(public readonly input: DeleteRefreshTokenRequest) {}
}

@CommandHandler(DeleteRefreshTokenCommand)
@RpcHandler()
export class DeleteRefreshTokenHandler
  implements
    ICommandHandler<DeleteRefreshTokenCommand, DeleteRefreshTokenResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly provision: AccessProvisionService,
  ) {}

  async execute(
    command: DeleteRefreshTokenCommand,
  ): Promise<DeleteRefreshTokenResponse> {
    const refreshToken = command.input.refreshToken;
    const tokenData = await this.provision.revokeRefreshToken(refreshToken);
    if (tokenData) {
      const event = new RefreshTokenDeletedEvent(refreshToken, tokenData);
      this.eventBus.publish(event);
    }

    return {
      success: true,
    };
  }
}
