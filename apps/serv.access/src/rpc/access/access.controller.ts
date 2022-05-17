import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateAccessRequest,
  CreateAccessResponse,
  DeleteAccessRequest,
  DeleteAccessResponse,
  FindAccessRequest,
  FindAccessResponse,
  HasRightsRequest,
  HasRightsResponse,
  ACCESS_SERVICE_NAME,
  AccessServiceController,
  ReadAccessRequest,
  ReadAccessResponse,
} from '@serv.access/protobuf/access';

import { Controller } from '@nestjs/common';
import { CreateAccessCommand } from '@serv.access/rpc/access/commands/create.access.command';
import { DeleteAccessCommand } from '@serv.access/rpc/access/commands/delete.access.command';
import { FindAccessQuery } from '@serv.access/rpc/access/queries/find.access.query';
import { GrpcMethod } from '@nestjs/microservices';
import { HasRightsQuery } from '@serv.access/rpc/access/queries/has.rights.query';
import { Metadata } from '@grpc/grpc-js';
import { ReadAccessQuery } from '@serv.access/rpc/access/queries/read.access.query';
import { getIdentityFromCtx } from '@valhalla/serv.core';

@Controller()
export class RpcAccessController implements AccessServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(ACCESS_SERVICE_NAME)
  async createAccess(
    request: CreateAccessRequest,
    metadata?: Metadata,
  ): Promise<CreateAccessResponse> {
    const identity = getIdentityFromCtx(metadata);
    const command = new CreateAccessCommand(
      {
        tenantId: request.tenantId,
        scopes: request.scopes,
        name: request.name,
        expiresAt: request.expiresAt,
      },
      identity.user,
    );

    const result = await this.commandBus.execute(command);
    return result;
  }

  @GrpcMethod(ACCESS_SERVICE_NAME)
  async deleteAccess(
    request: DeleteAccessRequest,
  ): Promise<DeleteAccessResponse> {
    const command = new DeleteAccessCommand(request, request.tenantId);
    const result = await this.queryBus.execute(command);
    return result;
  }

  @GrpcMethod(ACCESS_SERVICE_NAME)
  async findAccess(
    request: FindAccessRequest,
    metadata?: Metadata,
  ): Promise<FindAccessResponse> {
    const identity = getIdentityFromCtx(metadata);
    const tenantId = request.tenantId ?? identity.tenantInfo.tenantId;
    const query = new FindAccessQuery({ filter: request.filter, tenantId });
    const result = await this.queryBus.execute(query);
    return result;
  }

  @GrpcMethod(ACCESS_SERVICE_NAME)
  async readAccess(
    request: ReadAccessRequest,
    metadata?: Metadata,
  ): Promise<ReadAccessResponse> {
    const identity = getIdentityFromCtx(metadata);
    const tenantId = request.tenantId ?? identity.tenantInfo.tenantId;
    const query = new ReadAccessQuery({ id: request.id, tenantId });
    const result = await this.queryBus.execute(query);
    return result;
  }

  async hasRights(request: HasRightsRequest): Promise<HasRightsResponse> {
    const query = new HasRightsQuery(request);
    const result = await this.queryBus.execute(query);
    return result;
  }
}
