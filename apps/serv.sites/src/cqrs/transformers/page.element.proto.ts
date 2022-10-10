import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { PageElement, PrimitiveElementType, TextElement } from '@app/protobuf';

import { PageElementAreaProto } from './page.element.area.proto';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { TextElementProto } from './page.element.text.proto';

export class PageElementProto implements PageElement {
  @Expose({ name: '_id' })
  id: string;
  updatedBy: string;
  createdBy: string;
  group: string;
  @Type(() => PageElementAreaProto)
  desktop: PageElementAreaProto;
  @Type(() => PageElementAreaProto)
  tablet?: PageElementAreaProto;
  @Type(() => PageElementAreaProto)
  mobile?: PageElementAreaProto;
  createdAt?: Date;
  updatedAt?: Date;

  @Transform(
    ({
      value,
      obj,
    }: {
      value: PrimitiveElementType;
      obj: PageElementSchema;
    }) => {
      if (value === PrimitiveElementType.TEXT) {
        return plainToInstance(TextElementProto, obj);
      }
    },
  )
  type: {
    $case: 'text';
    text: TextElement;
  };
}
