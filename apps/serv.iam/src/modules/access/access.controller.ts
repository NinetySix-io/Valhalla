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
  IAM_SERVICE_NAME,
  IamServiceController,
  ReadAccessRequest,
  ReadAccessResponse,
} from '@serv.iam/protobuf/access';

import { Controller } from '@nestjs/common';
import { CreateAccessCommand } from '@serv.iam/cqrs/commands/create.access.command';
import { DeleteAccessCommand } from '@serv.iam/cqrs/commands/delete.access.command';
import { FindAccessQuery } from '@serv.iam/cqrs/queries/find.access.query';
import { GrpcMethod } from '@nestjs/microservices';
import { HasRightsQuery } from '@serv.iam/cqrs/queries/has.rights.query';
import { Metadata } from '@grpc/grpc-js';
import { ReadAccessQuery } from '@serv.iam/cqrs/queries/read.access.query';
import { getIdentityFromCtx } from '@valhalla/serv.core/src';

@Controller('webhook')
export class AccessController implements IamServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(IAM_SERVICE_NAME)
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

  @GrpcMethod(IAM_SERVICE_NAME)
  async deleteAccess(
    request: DeleteAccessRequest,
  ): Promise<DeleteAccessResponse> {
    const command = new DeleteAccessCommand(request, request.tenantId);
    const result = await this.queryBus.execute(command);
    return result;
  }

  @GrpcMethod(IAM_SERVICE_NAME)
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

  @GrpcMethod(IAM_SERVICE_NAME)
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
