import { BaseSchema } from '@valhalla/serv.core';
import { Exclude } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';
import { SimpleModel } from '@valhalla/serv.core/src';
import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

@ObjectType()
@SimpleModel('access-tokens')
export class AccessTokenSchema extends BaseSchema {
  @Exclude()
  @prop()
  name: string;

  @Exclude()
  @prop()
  tenant?: mongoose.Types.ObjectId;

  @Exclude()
  @prop()
  expiresAt?: Date;

  @Exclude()
  @prop()
  scopes?: string[];

  @Exclude()
  @prop()
  active: boolean;

  @Exclude()
  @prop()
  createdBy: mongoose.Types.ObjectId;
}
