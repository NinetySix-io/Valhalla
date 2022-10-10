import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';

@ArgsType()
export class SectionMetaArgs {
  @Field()
  @IsObjectId()
  sectionId: string;

  @Field()
  @IsObjectId()
  pageId: string;
}
