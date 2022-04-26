import { Severity, modelOptions, prop } from '@typegoose/typegoose';

import { Expose } from 'class-transformer';
import { Field } from '@nestjs/graphql';
import { SitePageStructStyle } from './style';

export enum SitePageStructTag {
  DIV = 'div',
  BUTTON = 'button',
}

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class SitePageStructComponent {
  @Expose()
  @Field()
  @prop()
  className?: string;

  @Expose()
  @Field()
  @prop()
  id?: string;

  @Expose()
  @Field()
  @prop()
  tag: SitePageStructTag;

  @Expose()
  @Field()
  @prop()
  style?: SitePageStructStyle;

  @Expose()
  @Field()
  @prop()
  children?: SitePageStructComponent | string | number;
}
