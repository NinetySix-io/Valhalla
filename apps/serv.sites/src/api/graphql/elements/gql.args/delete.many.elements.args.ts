import { ArgsType, Field } from '@nestjs/graphql';

import { IsArray } from 'class-validator';
import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class DeleteManyElementsArgs {
  @Field(() => [ObjectIDResolver])
  @IsArray()
  @IsObjectId({ each: true })
  elementIds: string[];
}
