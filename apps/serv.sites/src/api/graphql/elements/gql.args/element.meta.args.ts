import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class ElementMetaArgs {
  @Field()
  @IsObjectId()
  elementId: string;

  @Field()
  @IsObjectId()
  groupId: string;
}
