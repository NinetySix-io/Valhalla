import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteAccessRequest,
  DeleteAccessResponse,
} from '@serv.iam/protobuf/access';

import { AccessTokenDeletedEvent } from '../events/access.token.deleted.event';
import { AccessTokenTransformer } from '@serv.iam/entities/access.tokens/transformer';
import { AccessTokensModel } from '@serv.iam/entities/access.tokens';
import { NestCasbinService } from 'nestjs-casbin';
import { RpcHandler } from '@valhalla/serv.core/src';

export class DeleteAccessCommand implements ICommand {
  constructor(
    public readonly cmd: DeleteAccessRequest,
    public readonly tenantId: string,
  ) {}
}

@CommandHandler(DeleteAccessCommand)
@RpcHandler()
export class DeleteAccessHandler
  implements ICommandHandler<DeleteAccessCommand, DeleteAccessResponse>
{
  constructor(
    private readonly accessTokens: AccessTokensModel,
    private readonly eventBus: EventBus,
    private readonly accessEnforcer: NestCasbinService,
  ) {}

  async execute(command: DeleteAccessCommand): Promise<DeleteAccessResponse> {
    const token = await this.accessTokens.findByIdAndDelete(command.cmd.id);
    if (!token) {
      throw new Error('Access token not found');
    }

    await this.accessEnforcer.deleteUser(token.id);
    await this.accessEnforcer.deletePermissionsForUser(token.id);
    await this.eventBus.publish(new AccessTokenDeletedEvent(token));
    const accessToken = new AccessTokenTransformer(token).proto;
    return {
      accessToken,
    };
  }
}
