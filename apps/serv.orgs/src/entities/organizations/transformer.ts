import { toDto, typegoose } from '@valhalla/serv.core';

import { Organization as OrgProto } from '@app/protobuf';
import { OrganizationSchema } from './schema';

export class OrganizationTransformer extends OrganizationSchema {
  constructor(
    entity: typegoose.DocumentType<OrganizationSchema> | OrganizationSchema,
  ) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): OrgProto {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy.toString(),
      updateBy: this.updatedBy.toString(),
      logoUrl: this.logoUrl,
      status: this.status,
      plan: this.plan,
    };
  }
}
