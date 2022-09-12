import { toDto, typegoose } from '@valhalla/serv.core';

import { Site as Proto } from '@app/protobuf';
import { SiteSchema } from './schema';

type Entity = typegoose.DocumentType<SiteSchema> | SiteSchema;
export class SiteTransformer extends SiteSchema {
  constructor(entity: Entity) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  static fromEntity(entity: Entity) {
    return new SiteTransformer(entity);
  }

  get proto(): Proto {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      status: this.status,
      ownBy: this.ownBy.toString(),
      createdBy: this.createdBy.toString(),
      updatedBy: this.updatedBy.toString(),
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}
