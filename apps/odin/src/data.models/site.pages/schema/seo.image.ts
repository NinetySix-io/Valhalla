import { Field, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

import { Expose } from 'class-transformer';

export enum SitePageSeoImageType {
  JPEG = 'image/jpeg',
}

@modelOptions({})
@ObjectType()
export class SitePageSeoImageSchema {
  @Expose()
  @Field({ description: 'Link to the image' })
  @prop()
  url: string;

  @Expose()
  @Field(() => SitePageSeoImageType, { description: 'Image type' })
  @prop()
  type: SitePageSeoImageType;

  @Expose()
  @Field({ description: 'Width of the image' })
  @prop()
  width?: number;

  @Expose()
  @Field({ description: 'Height of the image' })
  @prop()
  height?: number;

  @Expose()
  @Field({ description: 'Alterative title for the image' })
  @prop()
  alt?: number;
}
