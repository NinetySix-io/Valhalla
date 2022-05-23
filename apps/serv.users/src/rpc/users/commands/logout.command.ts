import * as rx from 'rxjs';

import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { LogoutRequest, LogoutResponse } from '@app/rpc/protobuf/users';

import { AccessRpcClientService } from '@valhalla/serv.clients';
import { RpcHandler } from '@valhalla/serv.core';
import { UserLoggedOutEvent } from '../events/user.logged.out.event';

export class LogoutCommand implements ICommand {
  constructor(public readonly input: LogoutRequest) {}
}

@CommandHandler(LogoutCommand)
@RpcHandler()
export class LogoutHandler
  implements ICommandHandler<LogoutCommand, LogoutResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly accessRpcClient: AccessRpcClientService,
  ) {}

  async execute(command: LogoutCommand): Promise<LogoutResponse> {
    const refreshToken = command.input.refreshToken;
    if (refreshToken) {
      const tokenData = await rx.firstValueFrom(
        this.accessRpcClient.svc.readAccess({
          refreshToken,
        }),
      );

      this.accessRpcClient.svc.deleteRefreshToken({ refreshToken });
      const event = new UserLoggedOutEvent(tokenData.userId);
      this.eventBus.publish(event);
    }

    return {
      success: true,
    };
  }
}
