import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class PageMetaArgs {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  siteId: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  pageId: string;
}
