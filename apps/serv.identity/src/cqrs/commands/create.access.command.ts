import { Account, CreateAccessResponse } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { RefreshTokenCreatedEvent } from '../events/refresh.token.created.event';
import { RpcHandler } from '@valhalla/serv.core';
import { TokenTransformer } from '@app/lib/transformers/token.transformer';

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
    const account = command.input;
    const tokenData = await this.provision.createRefreshToken(command.input);
    const { accessToken, refreshToken } = tokenData;
    const accessTokenProto = new TokenTransformer(accessToken).proto;
    const refreshTokenProto = new TokenTransformer(refreshToken).proto;

    this.eventBus.publish(
      new RefreshTokenCreatedEvent({
        account: account.id,
        refreshToken: refreshTokenProto,
      }),
    );

    return {
      accessToken: accessTokenProto,
      refreshToken: refreshTokenProto,
    };
  }
}
