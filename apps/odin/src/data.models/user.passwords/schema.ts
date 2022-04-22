import { index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { Exclude } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';
import type { Ref } from '@typegoose/typegoose';
import { UserSchema } from '@odin/data.models/users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('user.passwords')
@index({ user: 1 })
@expiryIndex({ expiresAt: 1 })
export class UserPasswordSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @Exclude()
  @prop()
  hashed: string;

  @Exclude()
  @prop()
  expiresAt?: Date;
}
