import { Expose, Transform } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { Element } from './element';
import { JSONObjectResolver } from 'graphql-scalars';
import { PageElement } from '@app/protobuf';
import { TextElementProto } from '@app/cqrs/protos/page.element.text.proto';

@ObjectType()
export class ElementText extends Element implements TextElementProto {
  @Expose()
  @Field({ nullable: true })
  @Transform((p: { obj: PageElement }) => p.obj.type.text.html)
  html: string;

  @Expose()
  @Field(() => JSONObjectResolver, { nullable: true })
  @Transform((p: { obj: PageElement }) => p.obj.type.text.json)
  json?: { [key: string]: unknown };
}
