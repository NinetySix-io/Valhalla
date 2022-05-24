import {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
  CreateTenantRequest,
  CreateTenantResponse,
  DeleteMemberRequest,
  DeleteMemberResponse,
  DeleteTenantRequest,
  DeleteTenantResponse,
  GetMemberRequest,
  GetMemberResponse,
  GetTenantRequest,
  GetTenantResponse,
  InviteMemberRequest,
  InviteMemberResponse,
  TenantAvailableRequest,
  TenantAvailableResponse,
  TenantsServiceController,
  UpdateMemberRequest,
  UpdateMemberResponse,
  UpdateTenantRequest,
  UpdateTenantResponse,
} from '@app/rpc/protobuf/tenants';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AcceptMemberInvitationCommand } from './commands/accept.member.invitation.command';
import { Controller } from '@nestjs/common';
import { CreateTenantCommand } from './commands/create.tenant.command';
import { DeleteMemberCommand } from './commands/delete.member.command';
import { DeleteTenantCommand } from './commands/delete.tenant.command';
import { GetMemberQuery } from './queries/get.member.query';
import { GetTenantQuery } from './queries/get.tenant.query';
import { InviteMemberCommand } from './commands/invite.member.command';
import { Observable } from 'rxjs';
import { TenantAvailableQuery } from './queries/tenant.available.query';
import { UpdateMemberCommand } from './commands/update.member.command';
import { UpdateTenantCommand } from './commands/update.tenant.command';

@Controller()
export class RpcTenantsController implements TenantsServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createTenant(
    request: CreateTenantRequest,
  ):
    | CreateTenantResponse
    | Promise<CreateTenantResponse>
    | Observable<CreateTenantResponse> {
    return this.commandBus.execute(new CreateTenantCommand(request));
  }

  getTenant(
    request: GetTenantRequest,
  ):
    | GetTenantResponse
    | Promise<GetTenantResponse>
    | Observable<GetTenantResponse> {
    return this.queryBus.execute(new GetTenantQuery(request));
  }

  updateTenant(
    request: UpdateTenantRequest,
  ):
    | UpdateTenantResponse
    | Promise<UpdateTenantResponse>
    | Observable<UpdateTenantResponse> {
    return this.commandBus.execute(new UpdateTenantCommand(request));
  }

  deleteTenant(
    request: DeleteTenantRequest,
  ):
    | DeleteTenantResponse
    | Promise<DeleteTenantResponse>
    | Observable<DeleteTenantResponse> {
    return this.commandBus.execute(new DeleteTenantCommand(request));
  }

  tenantAvailable(
    request: TenantAvailableRequest,
  ):
    | TenantAvailableResponse
    | Promise<TenantAvailableResponse>
    | Observable<TenantAvailableResponse> {
    return this.queryBus.execute(new TenantAvailableQuery(request));
  }

  inviteMember(
    request: InviteMemberRequest,
  ):
    | InviteMemberResponse
    | Promise<InviteMemberResponse>
    | Observable<InviteMemberResponse> {
    return this.commandBus.execute(new InviteMemberCommand(request));
  }

  acceptMemberInvitation(
    request: AcceptMemberInvitationRequest,
  ):
    | AcceptMemberInvitationResponse
    | Promise<AcceptMemberInvitationResponse>
    | Observable<AcceptMemberInvitationResponse> {
    return this.commandBus.execute(new AcceptMemberInvitationCommand(request));
  }

  updateMember(
    request: UpdateMemberRequest,
  ):
    | UpdateMemberResponse
    | Promise<UpdateMemberResponse>
    | Observable<UpdateMemberResponse> {
    return this.commandBus.execute(new UpdateMemberCommand(request));
  }

  deleteMember(
    request: DeleteMemberRequest,
  ):
    | DeleteMemberResponse
    | Promise<DeleteMemberResponse>
    | Observable<DeleteMemberResponse> {
    return this.commandBus.execute(new DeleteMemberCommand(request));
  }

  getMember(
    request: GetMemberRequest,
  ):
    | GetMemberResponse
    | Promise<GetMemberResponse>
    | Observable<GetMemberResponse> {
    return this.queryBus.execute(new GetMemberQuery(request));
  }
}
