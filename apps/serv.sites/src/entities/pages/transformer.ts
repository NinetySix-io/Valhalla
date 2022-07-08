import { toDto, typegoose } from '@valhalla/serv.core';

import { PageSchema } from './schema';
import { Page as Proto } from '@app/protobuf';

export class PageTransformer extends PageSchema {
  constructor(entity: typegoose.DocumentType<PageSchema> | PageSchema) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy.toHexString(),
      createdBy: this.createdBy.toHexString(),
      isLoneTitle: this.isLoneTitle,
      title: this.title,
      description: this.description,
      ownBy: this.ownBy.toHexString(),
      site: this.site.toHexString(),
      status: this.status,
    };
  }
}
