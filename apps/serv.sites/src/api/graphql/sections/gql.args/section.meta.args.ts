import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class SectionMetaArgs {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  sectionId: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  pageId: string;
}
