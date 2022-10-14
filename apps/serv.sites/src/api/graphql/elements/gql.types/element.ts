import { Expose, Transform, Type } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PageElement, PrimitiveElementType } from '@app/protobuf';

import { ElementArea } from './element.area';
import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';
import { PageElementProto } from '@app/cqrs/protos/page.element.proto';
import { ValidateNested } from 'class-validator';

registerEnumType(PrimitiveElementType, { name: 'ElementType' });

@ObjectType({ isAbstract: true })
export class Element implements Omit<PageElementProto, 'type'> {
  @Expose()
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  id: string;

  @Expose()
  @Field(() => PrimitiveElementType)
  @Transform((p: { obj: PageElement }) =>
    p.obj.type.$case === 'text' ? PrimitiveElementType.TEXT : null,
  )
  type: PrimitiveElementType;

  @Expose()
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  updatedBy: string;

  @Expose()
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  createdBy: string;

  @Expose()
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  group: string;

  @Expose()
  @Field(() => ElementArea)
  @Type()
  @ValidateNested()
  desktop: ElementArea;

  @Expose()
  @Field(() => ElementArea, { nullable: true })
  @Type()
  @ValidateNested()
  tablet?: ElementArea;

  @Expose()
  @Field(() => ElementArea, { nullable: true })
  @Type()
  @ValidateNested()
  mobile?: ElementArea;

  @Expose()
  @Field({ nullable: true })
  @ValidateNested()
  createdAt?: Date;

  @Expose()
  @Field({ nullable: true })
  updatedAt?: Date;
}
