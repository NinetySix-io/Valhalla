import { Ref, index, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { UserSchema } from '../users/schema';
import { registerEnumType } from '@nestjs/graphql';

export enum AuthProvider {
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  MICROSOFT = 'microsoft',
  TWITTER = 'twitter',
  APPLE = 'apple',
}

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Available Auth Providers',
});

@modelOptions({
  schemaOptions: {
    collection: 'user.auth.providers',
  },
})
@index({ user: 1 })
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
