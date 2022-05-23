import {
  ACCESS_SERVICE_NAME,
  AccessServiceController,
  CreateAccessRequest,
  CreateAccessResponse,
  DecodeAccessTokenRequest,
  DecodeAccessTokenResponse,
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
  ReadAccessRequest,
  ReadAccessResponse,
  RenewAccessTokenRequest,
  RenewAccessTokenResponse,
} from '@app/rpc/protobuf/access';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Controller } from '@nestjs/common';
import { CreateAccessCommand } from '@app/rpc/access/commands/create.access.command';
import { DecodeAccessTokenCommand } from './commands/decode.access.token.command';
import { DeleteRefreshTokenCommand } from '@app/rpc/access/commands/delete.refresh.token.command';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { ReadAccessQuery } from './queries/read.access.query';
import { RenewAccessTokenCommand } from './commands/renew.access.token.command';

@Controller()
@GrpcClass(ACCESS_SERVICE_NAME)
export class RpcAccessController implements AccessServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  readAccess(
    request: ReadAccessRequest,
  ):
    | ReadAccessResponse
    | Promise<ReadAccessResponse>
    | Observable<ReadAccessResponse> {
    return this.queryBus.execute(new ReadAccessQuery(request));
  }

  createAccess(
    request: CreateAccessRequest,
  ):
    | CreateAccessResponse
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse> {
    return this.commandBus.execute(new CreateAccessCommand(request));
  }

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
  ): Promise<DeleteRefreshTokenResponse> {
    return this.commandBus.execute(new DeleteRefreshTokenCommand(request));
  }

  renewAccessToken(
    request: RenewAccessTokenRequest,
  ):
    | RenewAccessTokenResponse
    | Promise<RenewAccessTokenResponse>
    | Observable<RenewAccessTokenResponse> {
    return this.commandBus.execute(new RenewAccessTokenCommand(request));
  }

  decodeAccessToken(
    request: DecodeAccessTokenRequest,
  ):
    | DecodeAccessTokenResponse
    | Promise<DecodeAccessTokenResponse>
    | Observable<DecodeAccessTokenResponse> {
    return this.commandBus.execute(new DecodeAccessTokenCommand(request));
  }
}
