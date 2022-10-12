import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class ElementMetaArgs {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  elementId: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  groupId: string;
}
