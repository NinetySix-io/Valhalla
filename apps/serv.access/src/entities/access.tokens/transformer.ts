import { Access } from '@serv.access/protobuf/access';
import { AccessTokenSchema } from './schema';

export class AccessTokenTransformer {
  entity: AccessTokenSchema;

  constructor(entity: AccessTokenSchema) {
    this.entity = entity;
  }

  get proto(): Access {
    return {
      active: this.entity.active,
      id: this.entity.id,
      token: this.entity.id,
      scopes: this.entity.scopes,
      name: this.entity.name,
      tenantId: this.entity.tenant?.toHexString(),
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
      createdBy: this.entity.createdBy.toHexString(),
    };
  }
}
