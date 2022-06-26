import { Organization as OrgProto } from '@app/protobuf';
import { OrganizationSchema } from './schema';
import { typegoose } from '@valhalla/serv.core';

export class OrganizationTransformer extends OrganizationSchema {
  constructor(
    entity: typegoose.DocumentType<OrganizationSchema> | OrganizationSchema,
  ) {
    super();
    Object.assign(
      this,
      typegoose.isDocument(entity)
        ? entity.toObject({ virtuals: false })
        : entity,
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
      status: this.status,
      plan: this.plan,
    };
  }
}
