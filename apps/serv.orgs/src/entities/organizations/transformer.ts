import { DocumentType, isDocument } from '@typegoose/typegoose';
import { OrgPlan, Organization as OrgProto, OrgStatus } from '@app/protobuf';

import { OrganizationSchema } from './schema';

export class OrganizationTransformer extends OrganizationSchema {
  constructor(entity: DocumentType<OrganizationSchema> | OrganizationSchema) {
    super();
    Object.assign(
      this,
      isDocument(entity) ? entity.toObject({ virtuals: false }) : entity,
    );
  }

  get proto(): OrgProto {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      createdBy: this.createdBy.toHexString(),
      updateBy: this.updatedBy.toHexString(),
      logoUrl: this.logoUrl,
      status: OrgStatus[this.status],
      plan: OrgPlan[this.plan],
    };
  }
}
