import { Ref, index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { UserSchema } from '../users/schema';
import { registerEnumType } from '@nestjs/graphql';
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

@simpleModel('user.auth.providers')
@index({ user: 1, provider: 1 }, { unique: true })
export class UserAuthProviderSchema extends BaseSchema {
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  accessToken: string;

  @prop()
  refreshToken: string;

  @prop()
  provider: AuthProvider;

  @prop()
  raw: any;
}
