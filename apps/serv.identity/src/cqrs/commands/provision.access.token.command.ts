import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
} from '@app/protobuf';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { RpcHandler } from '@valhalla/serv.core';
import { TokenTransformer } from '@app/lib/transformers/token.transformer';

export class ProvisionAccessTokenCommand implements ICommand {
  constructor(public readonly input: ProvisionAccessTokenRequest) {}
}

@CommandHandler(ProvisionAccessTokenCommand)
@RpcHandler()
export class ProvisionAccessTokenHandler
  implements
    ICommandHandler<ProvisionAccessTokenCommand, ProvisionAccessTokenResponse>
{
  constructor(private readonly provision: AccessProvisionService) {}

  async execute(
    command: ProvisionAccessTokenCommand,
  ): Promise<ProvisionAccessTokenResponse> {
    const { refreshToken, organization } = command.input;
    const accessToken = await this.provision.renewAccessToken(refreshToken, {
      organization,
    });

    const serialized = new TokenTransformer(accessToken).proto;

    return {
      accessToken: serialized,
    };
  }
}
