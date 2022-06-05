import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { LogoutRequest, LogoutResponse } from '@app/protobuf';

import { AccountLoggedOutEvent } from '../events/account.logged.out.event';
import { DeleteRefreshTokenCommand } from './delete.refresh.token.command';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { RpcHandler } from '@valhalla/serv.core';

export class LogoutCommand implements ICommand {
  constructor(public readonly input: LogoutRequest) {}
}

@CommandHandler(LogoutCommand)
@RpcHandler()
export class LogoutHandler
  implements ICommandHandler<LogoutCommand, LogoutResponse>
{
  constructor(
    private readonly refreshTokens: RefreshTokensModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: LogoutCommand): Promise<LogoutResponse> {
    const refreshToken = command.input.refreshToken;
    if (refreshToken) {
      const token = await this.refreshTokens.findByIdAndDelete(refreshToken);
      await this.commandBus.execute(
        new DeleteRefreshTokenCommand({
          refreshToken,
        }),
      );

      if (token) {
        const event = new AccountLoggedOutEvent(token.account.toHexString());
        this.eventBus.publish(event);
      }
    }

    return {
      success: true,
    };
  }
}
