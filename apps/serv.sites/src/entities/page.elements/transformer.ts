import { PrimitiveElementType, PageElement as Proto } from '@app/protobuf';
import { toDto, typegoose } from '@valhalla/serv.core';

import { PageElementSchema } from './schemas';
import { PageElementTextSchema } from './variants/text.variant';

export class PageElementTransformer extends PageElementSchema {
  constructor(
    private readonly entity:
      | typegoose.DocumentType<PageElementSchema>
      | PageElementSchema,
  ) {
    super();
    Object.assign(
      this,
      toDto(entity, {
        virtuals: false,
      }),
    );
  }

  get typeProto(): Proto['type'] {
    if (this.type === PrimitiveElementType.TEXT) {
      const text = this.entity as PageElementTextSchema;
      return {
        $case: 'text',
        text: {
          json: text.json,
          html: text.html,
        },
      };
    }

    throw new Error('Invalid type');
  }

  get proto(): Proto {
    return {
      id: this.id,
      desktop: this.desktop,
      tablet: this.tablet,
      mobile: this.mobile,
      type: this.typeProto,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedBy: String(this.updatedBy),
      createdBy: String(this.createdBy),
    };
  }
}
