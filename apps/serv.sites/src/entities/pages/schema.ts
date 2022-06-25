import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { index, prop } from '@typegoose/typegoose';

import { PageStatus } from '@app/protobuf';
import mongoose from 'mongoose';

registerEnumType(PageStatus, {
  name: 'PageStatus',
});

@ObjectType()
@SimpleModel('pages')
@index({ site: 1 })
@index({ organization: 1 })
export class PageSchema extends BaseSchema {
  @prop()
  @Exclude()
  organization: mongoose.Types.ObjectId;

  @prop()
  @Exclude()
  site: mongoose.Types.ObjectId;

  @prop()
  @Expose()
  @Field({ description: 'Page deployment status' })
  status: PageStatus;

  @prop()
  @Expose()
  @Field({ description: 'Page title' })
  title: string;

  @prop()
  @Expose()
  @Field({
    description:
      'Whether the title should be independent or part of the title template',
  })
  isLoneTitle?: boolean;

  @prop()
  @Field({ description: 'Page description' })
  description?: string;

  @prop()
  @Exclude()
  createdBy: mongoose.Types.ObjectId;

  @prop()
  @Exclude()
  updatedBy: mongoose.Types.ObjectId;
}
