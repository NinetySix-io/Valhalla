import { Tenant as TenantProto } from '@app/rpc/protobuf/tenants';
import { TenantSchema } from './schema';

export class TenantTransformer {
  private entity: TenantSchema;

  constructor(entity: TenantSchema) {
    this.entity = entity;
  }

  get proto(): TenantProto {
    return {
      id: this.entity.id,
      slug: this.entity.slug,
      name: this.entity.name,
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
      createdBy: this.entity.createdBy.toHexString(),
    };
  }
}
