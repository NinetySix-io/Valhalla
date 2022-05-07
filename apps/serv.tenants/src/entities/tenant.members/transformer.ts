import { TenantMember as TenantMemberProto } from '@serv.tenants/protobuf/tenants';
import { TenantMemberSchema } from './schema';

export class TenantMemberTransformer {
  private entity: TenantMemberSchema;

  constructor(entity: TenantMemberSchema) {
    this.entity = entity;
  }

  get proto(): TenantMemberProto {
    return {
      id: this.entity.id,
      tenant: this.entity.tenant.toHexString(),
      user: this.entity.user.toHexString(),
      invitedBy: this.entity.invitedBy?.toHexString(),
      role: this.entity.role,
      status: this.entity.status,
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
    };
  }
}
