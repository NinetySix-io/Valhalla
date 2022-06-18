import {
  ArchiveOrgRequest,
  CreateOrgRequest,
  GetAccountActiveOrgRequest,
  GetAccountActiveOrgResponse,
  GetMemberRequest,
  GetMemberResponse,
  GetOrgRequest,
  GetOrgResponse,
  GetUserMembershipsRequest,
  GetUserMembershipsResponse,
  MarkDeleteMemberRequest,
  MarkDeleteMemberResponse,
  ORGS_SERVICE_NAME,
  Organization,
  OrgsServiceController,
  RestoreOrgRequest,
  SetAccountActiveOrgRequest,
  SetAccountActiveOrgResponse,
  UpdateOrgLogoRequest,
  UpdateOrgPlanRequest,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';

import { ArchiveOrgCommand } from '@app/cqrs/commands/archive.org.command';
import { Controller } from '@nestjs/common';
import { CreateOrgCommand } from '@app/cqrs/commands/create.org.command';
import { GetAccountActiveOrgQuery } from '@app/cqrs/queries/get.account.active.org.query';
import { GetMemberQuery } from '@app/cqrs/queries/get.member.query';
import { GetOrgQuery } from '@app/cqrs/queries/get.org.query';
import { GetUserMembershipsQuery } from '@app/cqrs/queries/get.user.memberships.query';
import { GrpcLogger } from './grpc.logger';
import { MarkDeleteOrgMemberCommand } from '@app/cqrs/commands/mark.delete.member.command';
import { Observable } from 'rxjs';
import { RestoreOrgCommand } from '@app/cqrs/commands/restore.org.command';
import { SetAccountActiveOrgCommand } from '@app/cqrs/commands/set.account.active.org.command';
import { UpdateOrgLogoCommand } from '@app/cqrs/commands/update.org.logo.command';
import { UpdateOrgPlanCommand } from '@app/cqrs/commands/update.org.plan.command';
import { isDev } from '@valhalla/utilities';

@Controller()
@GrpcClass(ORGS_SERVICE_NAME)
@LogClassMethods({
  when: isDev(),
  onTrigger: (fnName) => GrpcLogger.debug(`gRPC: ${fnName}`),
})
export class gRpcController implements OrgsServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  setAccountActiveOrg(
    request: SetAccountActiveOrgRequest,
  ):
    | SetAccountActiveOrgResponse
    | Promise<SetAccountActiveOrgResponse>
    | Observable<SetAccountActiveOrgResponse> {
    return this.commandBus.execute(new SetAccountActiveOrgCommand(request));
  }
  getAccountActiveOrg(
    request: GetAccountActiveOrgRequest,
  ):
    | GetAccountActiveOrgResponse
    | Promise<GetAccountActiveOrgResponse>
    | Observable<GetAccountActiveOrgResponse> {
    return this.queryBus.execute(new GetAccountActiveOrgQuery(request));
  }
  createOrg(
    request: CreateOrgRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new CreateOrgCommand(request));
  }
  getOrg(
    request: GetOrgRequest,
  ): GetOrgResponse | Promise<GetOrgResponse> | Observable<GetOrgResponse> {
    return this.queryBus.execute(new GetOrgQuery(request));
  }
  archiveOrg(
    request: ArchiveOrgRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new ArchiveOrgCommand(request));
  }
  restoreOrg(
    request: RestoreOrgRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new RestoreOrgCommand(request));
  }
  updateOrgPlan(
    request: UpdateOrgPlanRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new UpdateOrgPlanCommand(request));
  }
  updateOrgLogo(
    request: UpdateOrgLogoRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new UpdateOrgLogoCommand(request));
  }
  markDeleteMember(
    request: MarkDeleteMemberRequest,
  ):
    | MarkDeleteMemberResponse
    | Promise<MarkDeleteMemberResponse>
    | Observable<MarkDeleteMemberResponse> {
    return this.commandBus.execute(new MarkDeleteOrgMemberCommand(request));
  }
  getMember(
    request: GetMemberRequest,
  ):
    | GetMemberResponse
    | Promise<GetMemberResponse>
    | Observable<GetMemberResponse> {
    return this.queryBus.execute(new GetMemberQuery(request));
  }
  getUserMemberships(
    request: GetUserMembershipsRequest,
  ):
    | GetUserMembershipsResponse
    | Promise<GetUserMembershipsResponse>
    | Observable<GetUserMembershipsResponse> {
    return this.queryBus.execute(new GetUserMembershipsQuery(request));
  }
}
