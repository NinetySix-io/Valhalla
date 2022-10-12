import { Field, ObjectType } from '@nestjs/graphql';

import { Element } from './element';
import { JSONObjectResolver } from 'graphql-scalars';
import { PageElement } from '@app/protobuf';
import { TextElementProto } from '@app/cqrs/transformers/page.element.text.proto';
import { Transform } from 'class-transformer';

@ObjectType()
export class ElementText extends Element implements TextElementProto {
  @Field()
  @Transform((p: { obj: PageElement }) => p.obj.type.text.html)
  html: string;

  @Field(() => JSONObjectResolver)
  @Transform((p: { obj: PageElement }) => p.obj.type.text.json)
  json?: { [key: string]: unknown };
}
