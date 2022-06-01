import { Account, DecodeAccessTokenRequest } from '@app/protobuf';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { AccessProvisionService } from '@app/modules/access.provision/access.provision.service';
import { RpcHandler } from '@valhalla/serv.core';

export class DecodeAccessTokenCommand implements ICommand {
  constructor(public readonly input: DecodeAccessTokenRequest) {}
}

@CommandHandler(DecodeAccessTokenCommand)
@RpcHandler()
export class DecodeAccessTokenHandler
  implements ICommandHandler<DecodeAccessTokenCommand, Account>
{
  constructor(private readonly provision: AccessProvisionService) {}

  execute(command: DecodeAccessTokenCommand): Promise<Account> {
    const accessToken = command.input.accessToken;
    const data = this.provision.decodeAccessToken(accessToken);
    return Promise.resolve(data);
  }
}
