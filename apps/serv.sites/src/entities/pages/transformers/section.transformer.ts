import { toDto, typegoose } from '@valhalla/serv.core';

import { PageSectionSchema } from '../schemas';
import { PageSection as Proto } from '@app/protobuf';

export class PageSectionTransformer extends PageSectionSchema {
  constructor(
    entity: typegoose.DocumentType<PageSectionSchema> | PageSectionSchema,
  ) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      format: this.format,
      updatedBy: String(this.updatedBy),
      createdBy: String(this.createdBy),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
