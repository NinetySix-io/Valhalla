import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export class SitePageSeoFacebook {
  @Expose()
  @Field({
    description:
      'Used for Facebook Insights, you must add a facebook app ID to your page to for it',
  })
  @prop()
  appId: string;
}
