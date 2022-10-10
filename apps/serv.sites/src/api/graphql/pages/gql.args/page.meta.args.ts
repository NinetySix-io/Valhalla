import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class PageMetaArgs {
  @Field()
  @IsObjectId()
  siteId: string;

  @Field()
  @IsObjectId()
  pageId: string;
}
