import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Ref, Severity, index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { UserSchema } from '../users/schema';
import { simpleModel } from '../_base/decorators/simple.model';

export enum AuthProvider {
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  TWITTER = 'TWITTER',
  APPLE = 'APPLE',
}

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Available Auth Providers',
});

@ObjectType()
@simpleModel('user.auth.providers', { allowMixed: Severity.ALLOW })
@index({ user: 1, provider: 1 }, { unique: true })
export class UserAuthProviderSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @Exclude()
  @prop()
  accessToken: string;

  @Exclude()
  @prop()
  refreshToken: string;

  @Field({ description: 'Auth Provider connected to user account' })
  @Expose()
  @prop()
  provider: AuthProvider;

  @Exclude()
  @prop()
  raw: unknown;
}
