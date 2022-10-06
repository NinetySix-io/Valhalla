import { Field, ObjectType } from '@nestjs/graphql';
import { SimpleModel, typegoose } from '@valhalla/serv.core';

import { Expose } from 'class-transformer';
import JSON from 'graphql-type-json';
import { PageElementSchema } from '../schemas';
import mongoose from 'mongoose';

@ObjectType()
@SimpleModel(null, { allowMixed: true })
export class PageElementTextSchema extends PageElementSchema {
  //TODO: type this
  @typegoose.prop({ type: mongoose.Schema.Types.Mixed })
  @Expose()
  @Field(() => JSON)
  json: unknown;

  @typegoose.prop()
  @Expose()
  @Field()
  html: string;
}
