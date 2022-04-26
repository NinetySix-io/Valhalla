import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Ref, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@serv.odin/data.models/_base/schema';
import { SitePageSeoSchema } from './seo';
import { SiteSchema } from '@serv.odin/data.models/sites/schema';
import { simpleModel } from '@serv.odin/data.models/_base/decorators/simple.model';

@ObjectType()
@simpleModel('site.pages')
export class SitePageSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => SiteSchema })
  site: Ref<SiteSchema>;

  @Expose()
  @Field()
  @prop()
  title: string;

  @prop()
  @Expose()
  @Field()
  path: string;

  @prop()
  @Expose()
  @Field()
  description: string;

  @prop()
  @Expose()
  @Field()
  SEO: SitePageSeoSchema;
}
