import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { PageElement, PrimitiveElementType, TextElement } from '@app/protobuf';

import { PageElementAreaProto } from './page.element.area.proto';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { TextElementProto } from './page.element.text.proto';

export class PageElementProto implements PageElement {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  @AsString()
  updatedBy: string;

  @Expose()
  @AsString()
  createdBy: string;

  @Expose()
  @AsString()
  group: string;

  @Expose()
  @Type(() => PageElementAreaProto)
  desktop: PageElementAreaProto;

  @Expose()
  @Type(() => PageElementAreaProto)
  tablet?: PageElementAreaProto;

  @Expose()
  @Type(() => PageElementAreaProto)
  mobile?: PageElementAreaProto;

  @Expose()
  createdAt?: Date;

  @Expose()
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
