import { CreatePayload } from '@odin/data.models/_base/factory';
import { Injectable } from '@nestjs/common';
import { UserAuthProviderSchema } from '@odin/data.models/user.auth.providers/schema';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserSchema } from '@odin/data.models/users/schema';

@Injectable()
export class UserAuthProviderService {
  constructor(private readonly provider: UserAuthProvidersModel) {}

  async upsertProvider(
    user: UserSchema['_id'],
    provider: UserAuthProviderSchema['provider'],
    payload: Omit<CreatePayload<UserAuthProviderSchema>, 'user' | 'provider'>,
  ) {
    return this.provider.findOneAndUpdate(
      { user, provider },
      {
        $set: {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          raw: payload,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
  }
}
