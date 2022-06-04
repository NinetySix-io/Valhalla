import {
  AcceptOrgMemberInvitationRequest,
  AcceptOrgMemberInvitationResponse,
  CreateOrgRequest,
  CreateOrgResponse,
  DeleteOrgMemberRequest,
  DeleteOrgMemberResponse,
  DeleteOrgRequest,
  DeleteOrgResponse,
  GetOrgMemberRequest,
  GetOrgMemberResponse,
  GetOrgRequest,
  GetOrgResponse,
  InviteOrgMemberRequest,
  InviteOrgMemberResponse,
  OrgAvailableRequest,
  OrgAvailableResponse,
  OrgsServiceController,
  UpdateOrgMemberRequest,
  UpdateOrgMemberResponse,
  UpdateOrgRequest,
  UpdateOrgResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AcceptOrgMemberInvitationCommand } from '../cqrs/commands/accept.member.invitation.command';
import { Controller } from '@nestjs/common';
import { CreateOrgCommand } from '../cqrs/commands/create.org.command';
import { DeleteOrgCommand } from '../cqrs/commands/delete.tenant.command';
import { DeleteOrgMemberCommand } from '../cqrs/commands/delete.member.command';
import { GetMemberQuery } from '../cqrs/queries/get.member.query';
import { GetOrgQuery } from '../cqrs/queries/get.org.query';
import { InviteMemberCommand } from '../cqrs/commands/invite.member.command';
import { Observable } from 'rxjs';
import { OrgAvailableQuery } from '../cqrs/queries/org.available.query';
import { UpdateMemberCommand } from '../cqrs/commands/update.member.command';
import { UpdateOrgCommand } from '../cqrs/commands/update.tenant.command';

@Controller()
export class gRpcController implements OrgsServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  getOrgMember(
    request: GetOrgMemberRequest,
  ):
    | GetOrgMemberResponse
    | Promise<GetOrgMemberResponse>
    | Observable<GetOrgMemberResponse> {
    return this.queryBus.execute(new GetMemberQuery(request));
  }
  createOrg(
    request: CreateOrgRequest,
  ):
    | CreateOrgResponse
    | Promise<CreateOrgResponse>
    | Observable<CreateOrgResponse> {
    return this.commandBus.execute(new CreateOrgCommand(request));
  }
  orgAvailable(
    request: OrgAvailableRequest,
  ):
    | OrgAvailableResponse
    | Promise<OrgAvailableResponse>
    | Observable<OrgAvailableResponse> {
    return this.queryBus.execute(new OrgAvailableQuery(request));
  }
  inviteOrgMember(
    request: InviteOrgMemberRequest,
  ):
    | InviteOrgMemberResponse
    | Promise<InviteOrgMemberResponse>
    | Observable<InviteOrgMemberResponse> {
    return this.commandBus.execute(new InviteMemberCommand(request));
  }
  acceptOrgMemberInvitation(
    request: AcceptOrgMemberInvitationRequest,
  ):
    | AcceptOrgMemberInvitationResponse
    | Promise<AcceptOrgMemberInvitationResponse>
    | Observable<AcceptOrgMemberInvitationResponse> {
    return this.commandBus.execute(
      new AcceptOrgMemberInvitationCommand(request),
    );
  }
  updateOrgMember(
    request: UpdateOrgMemberRequest,
  ):
    | UpdateOrgMemberResponse
    | Promise<UpdateOrgMemberResponse>
    | Observable<UpdateOrgMemberResponse> {
    return this.commandBus.execute(new UpdateMemberCommand(request));
  }
  deleteOrgMember(
    request: DeleteOrgMemberRequest,
  ):
    | DeleteOrgMemberResponse
    | Promise<DeleteOrgMemberResponse>
    | Observable<DeleteOrgMemberResponse> {
    return this.commandBus.execute(new DeleteOrgMemberCommand(request));
  }

  CreateOrg(
    request: CreateOrgRequest,
  ):
    | CreateOrgResponse
    | Promise<CreateOrgResponse>
    | Observable<CreateOrgResponse> {
    return this.commandBus.execute(new CreateOrgCommand(request));
  }

  getOrg(
    request: GetOrgRequest,
  ): GetOrgResponse | Promise<GetOrgResponse> | Observable<GetOrgResponse> {
    return this.queryBus.execute(new GetOrgQuery(request));
  }

  updateOrg(
    request: UpdateOrgRequest,
  ):
    | UpdateOrgResponse
    | Promise<UpdateOrgResponse>
    | Observable<UpdateOrgResponse> {
    return this.commandBus.execute(new UpdateOrgCommand(request));
  }

  deleteOrg(
    request: DeleteOrgRequest,
  ):
    | DeleteOrgResponse
    | Promise<DeleteOrgResponse>
    | Observable<DeleteOrgResponse> {
    return this.commandBus.execute(new DeleteOrgCommand(request));
  }

  tenantAvailable(
    request: OrgAvailableRequest,
  ):
    | OrgAvailableResponse
    | Promise<OrgAvailableResponse>
    | Observable<OrgAvailableResponse> {
    return this.queryBus.execute(new OrgAvailableQuery(request));
  }

  AcceptOrgMemberInvitation(
    request: AcceptOrgMemberInvitationRequest,
  ):
    | AcceptOrgMemberInvitationResponse
    | Promise<AcceptOrgMemberInvitationResponse>
    | Observable<AcceptOrgMemberInvitationResponse> {
    return this.commandBus.execute(
      new AcceptOrgMemberInvitationCommand(request),
    );
  }

  DeleteOrgMember(
    request: DeleteOrgMemberRequest,
  ):
    | DeleteOrgMemberResponse
    | Promise<DeleteOrgMemberResponse>
    | Observable<DeleteOrgMemberResponse> {
    return this.commandBus.execute(new DeleteOrgMemberCommand(request));
  }
}
