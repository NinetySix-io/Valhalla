import { Ref, index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@serv.odin/data.models/_base/schema';
import { Exclude } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import mongoose from 'mongoose';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('user.refresh.tokens')
@index({ user: 1 }, { unique: true })
@expiryIndex({ expiresAt: 1 })
export class UserRefreshTokenSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @Exclude()
  @prop()
  token: mongoose.Types.ObjectId;

  @Exclude()
  @prop()
  expiresAt: Date;
}
