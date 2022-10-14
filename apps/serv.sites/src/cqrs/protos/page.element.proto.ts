import { Alias, AsString, Serializer, stringify } from '@valhalla/serv.core';
import { Expose, Transform, Type } from 'class-transformer';
import { PageElement, PrimitiveElementType } from '@app/protobuf';

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

  @Expose()
  @Transform(({ obj }: { obj: PageElementSchema }) => {
    if (obj.type === PrimitiveElementType.TEXT) {
      return {
        $case: 'text',
        text: Serializer.from(TextElementProto).serialize(obj),
      };
    }
  })
  type: {
    $case: 'text';
    text: TextElementProto;
  };
}
