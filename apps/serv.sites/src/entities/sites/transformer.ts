import { Site as Proto } from '@app/protobuf';
import { SiteSchema } from './schema';
import { typegoose } from '@valhalla/serv.core';

export class SiteTransformer extends SiteSchema {
  constructor(entity: typegoose.DocumentType<SiteSchema> | SiteSchema) {
    super();
    Object.assign(
      this,
      typegoose.isDocument(entity)
        ? entity.toObject({ virtuals: false })
        : entity,
    );
  }

  get proto(): Proto {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      status: this.status,
      ownBy: this.ownBy.toHexString(),
      createdBy: this.createdBy.toHexString(),
      updatedBy: this.updatedBy.toHexString(),
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}
