import { Field, ObjectType } from '@nestjs/graphql';

import { BaseSchema } from '../_base/schema';
import { Expose } from 'class-transformer';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { prop } from '@typegoose/typegoose';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('users')
@caseInsensitiveIndex({ email: 1 }, { unique: true })
export class UserSchema extends BaseSchema {
  @Field({ description: 'User email' })
  @Expose()
  @prop({ lowercase: true })
  email: string;

  @Field({ description: 'USer display name' })
  @Expose()
  @prop()
  displayName: string;

  @Field({ nullable: true, description: 'User avatar url' })
  @Expose()
  @prop()
  avatar?: string;
}
