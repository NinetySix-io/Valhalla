import { toDto, typegoose } from '@valhalla/serv.core';

import { Section as Proto } from '@app/protobuf';
import { SectionSchema } from './schemas';

export class SectionTransformer extends SectionSchema {
  constructor(entity: typegoose.DocumentType<SectionSchema> | SectionSchema) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      format: this.format,
      head: String(this.head),
      page: String(this.page),
      updatedBy: String(this.updatedBy),
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}
