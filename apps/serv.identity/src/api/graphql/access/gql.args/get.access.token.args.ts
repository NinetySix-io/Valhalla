import { ArgsType, Field } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { IsOptional } from 'class-validator';
import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class GetAccessTokenArgs {
  @Field(() => ObjectIDResolver, {
    nullable: true,
    description: 'Auth for organization',
  })
  @IsOptional()
  @IsObjectId()
  organizationId?: string;
}
