import {
  ACCESS_SERVICE_NAME,
  AccessServiceController,
  CreateAccessRequest,
  CreateAccessResponse,
  DeleteAccessRequest,
  DeleteAccessResponse,
  FindAccessRequest,
  FindAccessResponse,
  HasRightsRequest,
  HasRightsResponse,
  ReadAccessRequest,
  ReadAccessResponse,
} from '@app/rpc/protobuf/access';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Controller } from '@nestjs/common';
import { CreateAccessCommand } from '@app/rpc/access/commands/create.access.command';
import { DeleteAccessCommand } from '@app/rpc/access/commands/delete.access.command';
import { FindAccessQuery } from '@app/rpc/access/queries/find.access.query';
import { GrpcMethod } from '@nestjs/microservices';
import { HasRightsQuery } from '@app/rpc/access/queries/has.rights.query';
import { Metadata } from '@grpc/grpc-js';
import { ReadAccessQuery } from '@app/rpc/access/queries/read.access.query';
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
