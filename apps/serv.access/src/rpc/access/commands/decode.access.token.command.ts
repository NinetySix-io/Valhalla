import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  DecodeAccessTokenRequest,
  DecodeAccessTokenResponse,
} from '@app/rpc/protobuf/access';

import { AccessProvisionService } from '@app/services/access.provision.service';
import { RpcHandler } from '@valhalla/serv.core';

export class DecodeAccessTokenCommand implements ICommand {
  constructor(public readonly input: DecodeAccessTokenRequest) {}
}

@CommandHandler(DecodeAccessTokenCommand)
@RpcHandler()
export class DecodeAccessTokenHandler
  implements
    ICommandHandler<DecodeAccessTokenCommand, DecodeAccessTokenResponse>
{
  constructor(private readonly provision: AccessProvisionService) {}

  async execute(
    command: DecodeAccessTokenCommand,
  ): Promise<DecodeAccessTokenResponse> {
    const accessToken = command.input.accessToken;
    const data = await this.provision.decodeAccessToken(accessToken);
    return data;
  }
}
