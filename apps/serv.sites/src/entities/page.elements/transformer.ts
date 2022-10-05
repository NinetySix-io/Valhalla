import { toDto, typegoose } from '@valhalla/serv.core';

import { PageElementSchema } from './schemas';
import { PageElement as Proto } from '@app/protobuf';

export class PageElementTransformer extends PageElementSchema {
  constructor(
    entity: typegoose.DocumentType<PageElementSchema> | PageElementSchema,
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
