import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PageElement, PrimitiveElementType } from '@app/protobuf';
import { Transform, Type } from 'class-transformer';

import { ElementArea } from './element.area';
import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';
import { PageElementProto } from '@app/cqrs/protos/page.element.proto';
import { ValidateNested } from 'class-validator';

registerEnumType(PrimitiveElementType, { name: 'ElementType' });

@ObjectType({ isAbstract: true })
export class Element implements Omit<PageElementProto, 'type'> {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  id: string;

  @Field(() => PrimitiveElementType)
  @Transform((p: { obj: PageElement }) => p.obj.type.$case)
  type: PrimitiveElementType;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  updatedBy: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  createdBy: string;

  @Field(() => ObjectIDResolver)
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
