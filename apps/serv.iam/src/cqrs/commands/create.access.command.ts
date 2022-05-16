import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateAccessRequest,
  CreateAccessResponse,
} from '@serv.iam/protobuf/access';

import { AccessTokenCreatedEvent } from '../events/access.token.created.event';
import { AccessTokenTransformer } from '@serv.iam/entities/access.tokens/transformer';
import { AccessTokensModel } from '@serv.iam/entities/access.tokens';
import { NestCasbinService } from 'nestjs-casbin';
import { RpcException } from '@nestjs/microservices';
import { RpcHandler } from '@valhalla/serv.core';
import { ServUsers } from '@valhalla/entities';
import dayjs from 'dayjs';
import mongoose from 'mongoose';

export class CreateAccessCommand implements ICommand {
  constructor(
    public readonly cmd: CreateAccessRequest,
    public readonly user: ServUsers.User,
  ) {}
}

@CommandHandler(CreateAccessCommand)
@RpcHandler()
export class CreateAccessHandler
  implements ICommandHandler<CreateAccessCommand, CreateAccessResponse>
{
  constructor(
    private readonly accessTokens: AccessTokensModel,
    private readonly eventBus: EventBus,
    private readonly accessEnforcer: NestCasbinService,
  ) {}

  async execute(command: CreateAccessCommand): Promise<CreateAccessResponse> {
    if (!command.cmd.tenantId) {
      throw new RpcException('Missing tenant ID');
    }

    const userId = new mongoose.Types.ObjectId(command.user.id);
    const token = await this.accessTokens.create({
      active: true,
      createdBy: userId,
      name: command.cmd.name,
      scopes: command.cmd.scopes,
      tenant: new mongoose.Types.ObjectId(command.cmd.tenantId),
      expiresAt: dayjs(command.cmd.expiresAt).toDate(),
    });

    for await (const scope of command.cmd.scopes) {
      const objs = scope.split('_');
      await this.accessEnforcer.addPolicy(
        `${token.tenant.toHexString()}::${token.id}`,
        objs[1],
        objs[0],
      );
    }

    await this.eventBus.publish(new AccessTokenCreatedEvent(token));
    const accessToken = new AccessTokenTransformer(token).proto;
    return {
      accessToken,
    };
  }
}
