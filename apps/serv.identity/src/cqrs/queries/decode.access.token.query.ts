import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  DecodeAccessTokenRequest,
  DecodeAccessTokenResponse,
} from '@app/protobuf';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { RpcHandler } from '@valhalla/serv.core';

export class DecodeAccessTokenQuery implements ICommand {
  constructor(public readonly input: DecodeAccessTokenRequest) {}
}

@CommandHandler(DecodeAccessTokenQuery)
@RpcHandler()
export class DecodeAccessTokenHandler
  implements ICommandHandler<DecodeAccessTokenQuery, DecodeAccessTokenResponse>
{
  constructor(private readonly provision: AccessProvisionService) {}

  execute(command: DecodeAccessTokenQuery): Promise<DecodeAccessTokenResponse> {
    const accessToken = command.input.accessToken;
    const data = this.provision.decodeAccessToken(accessToken);
    return Promise.resolve(data);
  }
}
