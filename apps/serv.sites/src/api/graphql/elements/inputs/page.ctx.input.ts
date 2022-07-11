import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PageContextInput {
  @Field({ description: 'Site ID' })
  siteId: string;

  @Field({ description: 'Page ID' })
  pageId: string;
}
