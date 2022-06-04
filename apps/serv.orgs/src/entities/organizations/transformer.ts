import { Organization as OrgProto, OrgStatus } from '@app/protobuf';

import { OrganizationSchema } from './schema';

export class OrganizationTransformer {
  private entity: OrganizationSchema;

  constructor(entity: OrganizationSchema) {
    this.entity = entity;
  }

  get proto(): OrgProto {
    return {
      id: this.entity.id,
      slug: this.entity.slug,
      name: this.entity.name,
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
      createdBy: this.entity.createdBy.toHexString(),
      updateBy: this.entity.updatedBy.toHexString(),
      logoUrl: this.entity.logoUrl,
      status: OrgStatus[this.entity.status],
    };
  }
}
