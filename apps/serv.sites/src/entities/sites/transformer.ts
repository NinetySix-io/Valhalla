import { DocumentType, isDocument } from '@typegoose/typegoose';

import { Site as Proto } from '@app/protobuf';
import { SiteSchema } from './schema';

export class SiteTransformer extends SiteSchema {
  constructor(entity: DocumentType<SiteSchema> | SiteSchema) {
    super();
    Object.assign(
      this,
      isDocument(entity) ? entity.toObject({ virtuals: false }) : entity,
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
    };
  }
}
