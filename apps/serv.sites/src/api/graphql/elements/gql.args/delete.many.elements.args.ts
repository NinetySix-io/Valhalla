import { ArgsType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class DeleteManyElementsArgs {
  @IsArray()
  @IsObjectId({ each: true })
  elementIds: string[];
}
