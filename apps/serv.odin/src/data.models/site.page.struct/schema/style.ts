import { modelOptions, prop } from '@typegoose/typegoose';

import { Expose } from 'class-transformer';
import { Field } from '@nestjs/graphql';

@modelOptions({})
export class SitePageStructStyle {
  @Expose()
  @Field()
  @prop()
  key: string;

  @Expose()
  @Field()
  @prop()
  value: string | number;
}
