import { AccountLogoutRequest, AccountLogoutResponse } from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountLoggedOutEvent } from '../events/account.logged.out.event';
import { DeleteRefreshTokenCommand } from './delete.refresh.token.command';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { RpcHandler } from '@valhalla/serv.core';

export class AccountLogoutCommand implements ICommand {
  constructor(public readonly input: AccountLogoutRequest) {}
}

@CommandHandler(AccountLogoutCommand)
@RpcHandler()
export class AccountLogoutHandler
  implements ICommandHandler<AccountLogoutCommand, AccountLogoutResponse>
{
  constructor(
    private readonly refreshTokens: RefreshTokensModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: AccountLogoutCommand): Promise<AccountLogoutResponse> {
    const refreshToken = command.input.refreshToken;
    if (refreshToken) {
      const token = await this.refreshTokens.findByIdAndDelete(refreshToken);
      await this.commandBus.execute(
        new DeleteRefreshTokenCommand({
          refreshToken,
        }),
      );

      if (token) {
        const event = new AccountLoggedOutEvent(token?.account);
        this.eventBus.publish(event);
      }
    }

    return {
      success: true,
    };
  }
}
