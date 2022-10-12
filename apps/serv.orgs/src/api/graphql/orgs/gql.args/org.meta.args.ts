import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class OrgMetaArgs {
  @Field()
  @IsObjectId()
  orgId: string;
}
