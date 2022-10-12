import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class OrgMetaArgs {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  orgId: string;
}
