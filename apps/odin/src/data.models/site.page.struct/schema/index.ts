import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Ref, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { SitePageSchema } from '@odin/data.models/site.pages/schema';
import { SitePageStructComponent } from './component';
import { SitePageStructHeader } from './header';
import { simpleModel } from '@odin/data.models/_base/decorators/simple.model';

@ObjectType()
@simpleModel('site.page.structs')
export class SitePageStructSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => SitePageSchema })
  page: Ref<SitePageSchema>;

  @Expose()
  @prop()
  @Field()
  header: SitePageStructHeader;

  @Expose()
  @prop()
  @Field()
  body: SitePageStructComponent;
}
