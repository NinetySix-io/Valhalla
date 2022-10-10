import { Field, ObjectType } from '@nestjs/graphql';

import { Element } from './element';
import JSON from 'graphql-type-json';
import { PageElement } from '@app/protobuf';
import { TextElementProto } from '@app/cqrs/transformers/page.element.text.proto';
import { Transform } from 'class-transformer';

@ObjectType()
export class ElementText extends Element implements TextElementProto {
  @Field()
  @Transform((p: { obj: PageElement }) => p.obj.type.text.html)
  html: string;

  @Field(() => JSON)
  @Transform((p: { obj: PageElement }) => p.obj.type.text.json)
  json?: { [key: string]: unknown };
}
