import { Field, InputType, IntersectionType } from '@nestjs/graphql';

import { IsObjectId } from '@valhalla/serv.core';
import { StyleInput } from './style.input';

@InputType()
export class PageContextInput {
  @Field({ description: 'Site ID' })
  siteId: string;

  @Field({ description: 'Page ID' })
  pageId: string;
}

@InputType()
export class ElementCtxInput {
  @Field({ description: 'Element context' })
  ctx: PageContextInput;

  @Field({ nullable: true })
  style?: StyleInput;

  @Field()
  parent: string;
}

@InputType()
export class ElementIdInput {
  @Field({ description: 'Element ID' })
  @IsObjectId()
  elementId: string;
}

@InputType()
export class ElementIdCtxInput extends IntersectionType(
  ElementCtxInput,
  ElementIdInput,
) {}
