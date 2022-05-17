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
} from '@app/protobuf/tenants';

import { Controller } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

@Controller()
export class RpcTenantsController implements TenantsServiceController {
  createTenant(
    request: CreateTenantRequest,
    metadata?: Metadata,
  ):
    | CreateTenantResponse
    | Promise<CreateTenantResponse>
    | Observable<CreateTenantResponse> {
    throw new Error('Method not implemented.');
  }
  getTenant(
    request: GetTenantRequest,
    metadata?: Metadata,
  ):
    | GetTenantResponse
    | Promise<GetTenantResponse>
    | Observable<GetTenantResponse> {
    throw new Error('Method not implemented.');
  }
  updateTenant(
    request: UpdateTenantRequest,
    metadata?: Metadata,
  ):
    | UpdateTenantResponse
    | Promise<UpdateTenantResponse>
    | Observable<UpdateTenantResponse> {
    throw new Error('Method not implemented.');
  }
  deleteTenant(
    request: DeleteTenantRequest,
    metadata?: Metadata,
  ):
    | DeleteTenantResponse
    | Promise<DeleteTenantResponse>
    | Observable<DeleteTenantResponse> {
    throw new Error('Method not implemented.');
  }
  tenantAvailable(
    request: TenantAvailableRequest,
    metadata?: Metadata,
  ):
    | TenantAvailableResponse
    | Promise<TenantAvailableResponse>
    | Observable<TenantAvailableResponse> {
    throw new Error('Method not implemented.');
  }
  inviteMember(
    request: InviteMemberRequest,
    metadata?: Metadata,
  ):
    | InviteMemberResponse
    | Promise<InviteMemberResponse>
    | Observable<InviteMemberResponse> {
    throw new Error('Method not implemented.');
  }
  acceptMemberInvitation(
    request: AcceptMemberInvitationRequest,
    metadata?: Metadata,
  ):
    | AcceptMemberInvitationResponse
    | Promise<AcceptMemberInvitationResponse>
    | Observable<AcceptMemberInvitationResponse> {
    throw new Error('Method not implemented.');
  }
  updateMember(
    request: UpdateMemberRequest,
    metadata?: Metadata,
  ):
    | UpdateMemberResponse
    | Promise<UpdateMemberResponse>
    | Observable<UpdateMemberResponse> {
    throw new Error('Method not implemented.');
  }
  deleteMember(
    request: DeleteMemberRequest,
    metadata?: Metadata,
  ):
    | DeleteMemberResponse
    | Promise<DeleteMemberResponse>
    | Observable<DeleteMemberResponse> {
    throw new Error('Method not implemented.');
  }
  getMember(
    request: GetMemberRequest,
    metadata?: Metadata,
  ):
    | GetMemberResponse
    | Promise<GetMemberResponse>
    | Observable<GetMemberResponse> {
    throw new Error('Method not implemented.');
  }
}
