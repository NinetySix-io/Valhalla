import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PageElement, PrimitiveElementType } from '@app/protobuf';
import { Transform, Type } from 'class-transformer';

import { ElementArea } from './element.area';
import { IsObjectId } from '@valhalla/serv.core';
import { PageElementProto } from '@app/cqrs/transformers/page.element.proto';
import { ValidateNested } from 'class-validator';

registerEnumType(PrimitiveElementType, { name: 'ElementType' });

@ObjectType({ isAbstract: true })
export class Element implements Omit<PageElementProto, 'type'> {
  @Field()
  @IsObjectId()
  id: string;

  @Field(() => PrimitiveElementType)
  @Transform((p: { obj: PageElement }) => p.obj.type.$case)
  type: PrimitiveElementType;

  @Field()
  @IsObjectId()
  updatedBy: string;

  @Field()
  @IsObjectId()
  createdBy: string;

  @Field()
  @IsObjectId()
  group: string;

  @Field(() => ElementArea)
  @Type(() => ElementArea)
  @ValidateNested()
  desktop: ElementArea;

  @Field(() => ElementArea, { nullable: true })
  @Type(() => ElementArea)
  @ValidateNested()
  tablet?: ElementArea;

  @Field(() => ElementArea, { nullable: true })
  @Type(() => ElementArea)
  @ValidateNested()
  mobile?: ElementArea;

  @Field({ nullable: true })
  @ValidateNested()
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
