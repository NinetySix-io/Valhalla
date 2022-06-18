import { Field, InputType } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { IsOptional } from 'class-validator';

@InputType()
export class AccessTokenQuery {
  @Field({ nullable: true, description: 'Auth for organization' })
  @IsOptional()
  @IsObjectId()
  readonly organization?: string;
}
