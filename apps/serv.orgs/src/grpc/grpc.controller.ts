import {
  ArchiveOrgRequest,
  CreateOrgRequest,
  GetMemberRequest,
  GetOrgRequest,
  GetUserMembershipsRequest,
  GetUserMembershipsResponse,
  MarkDeleteMemberRequest,
  MarkDeleteMemberResponse,
  Member,
  Organization,
  OrgsServiceController,
  RestoreOrgRequest,
  UpdateOrgLogoRequest,
  UpdateOrgPlanRequest,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ArchiveOrgCommand } from '@app/cqrs/commands/archive.org.command';
import { Controller } from '@nestjs/common';
import { CreateOrgCommand } from '@app/cqrs/commands/create.org.command';
import { GetMemberQuery } from '@app/cqrs/queries/get.member.query';
import { GetOrgQuery } from '@app/cqrs/queries/get.org.query';
import { GetUserMembershipsQuery } from '@app/cqrs/queries/get.user.memberships.query';
import { MarkDeleteOrgMemberCommand } from '@app/cqrs/commands/mark.delete.member.command';
import { Observable } from 'rxjs';
import { RestoreOrgCommand } from '@app/cqrs/commands/restore.org.command';
import { UpdateOrgLogoCommand } from '@app/cqrs/commands/update.org.logo.command';
import { UpdateOrgPlanCommand } from '@app/cqrs/commands/update.org.plan.command';

@Controller()
export class gRpcController implements OrgsServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  createOrg(
    request: CreateOrgRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
    return this.commandBus.execute(new CreateOrgCommand(request));
  }
  getOrg(
    request: GetOrgRequest,
  ): Organization | Promise<Organization> | Observable<Organization> {
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
  ): Member | Promise<Member> | Observable<Member> {
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
