import { toDto, typegoose } from '@valhalla/serv.core';

import { SectionElement as Proto } from '@app/protobuf';
import { SectionElementSchema } from './schemas';

export class SectionElementTransformer extends SectionElementSchema {
  constructor(
    entity: typegoose.DocumentType<SectionElementSchema> | SectionElementSchema,
  ) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      desktop: this.desktop,
      tablet: this.tablet,
      mobile: this.mobile,
    };
  }
}
