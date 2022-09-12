import { toDto, typegoose } from '@valhalla/serv.core';

import { PageSchema } from './schema';
import { Page as Proto } from '@app/protobuf';

type Entity = typegoose.DocumentType<PageSchema> | PageSchema;
export class PageTransformer extends PageSchema {
  constructor(entity: Entity) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  static fromEntity(entity: Entity) {
    return new PageTransformer(entity);
  }

  get proto(): Proto {
    return {
      id: this.id,
      slug: this.slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy.toString(),
      createdBy: this.createdBy.toString(),
      isLoneTitle: this.isLoneTitle,
      title: this.title,
      description: this.description,
      ownBy: this.ownBy.toString(),
      site: this.site.toString(),
      status: this.status,
    };
  }
}
