import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class SiteMetaArgs {
  @Field()
  @IsObjectId()
  siteId: string;
}
