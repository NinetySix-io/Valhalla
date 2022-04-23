import { Field, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from 'yup';
import { Expose } from 'class-transformer';
import { SitePageSeoFacebook } from './seo.facebook';
import { SitePageSeoImageSchema } from './seo.image';
import { SitePageSeoTwitter } from './seo.twitter';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class SitePageSeoSchema extends BaseSchema {
  @Expose()
  @Field({ description: 'Page title' })
  @prop()
  title?: string;

  @Expose()
  @Field({ description: 'Short description of the page.' })
  @prop()
  description?: string;

  @Expose()
  @Field({ description: 'The page canonical url' })
  @prop()
  cannonical?: string;

  @Expose()
  @Field({
    description: 'Used by social media platforms, slack etc as a preview',
  })
  @prop()
  images?: SitePageSeoImageSchema[];

  @Expose()
  @Field()
  @prop()
  twitter?: SitePageSeoTwitter;

  @Expose()
  @Field()
  @prop()
  facebook?: SitePageSeoFacebook;

  @Expose()
  @Field({ description: 'Whether page should be indexed' })
  @prop()
  noIndex?: boolean;

  @Expose()
  @Field({ description: 'Whether page should be followed or not' })
  @prop()
  noFollow?: boolean;
}
