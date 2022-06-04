import { Organization as OrgProto } from '@app/protobuf';
import { OrgSchema } from './schema';

export class OrgTransformer {
  private entity: OrgSchema;

  constructor(entity: OrgSchema) {
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
    };
  }
}
