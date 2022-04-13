import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, CreatePayload, ModelType } from '../_base/factory';
import { UserAuthProviderSchema } from './schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserAuthProvidersModel extends BaseFactory<UserAuthProviderSchema> {
  constructor(
    @InjectModel(UserAuthProviderSchema)
    private readonly model: ModelType<UserAuthProviderSchema>,
  ) {
    super(model);
  }

  async validateToken(rawPassword: string, hashedPassword: string) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }

  async upsertProvider(
    user: UserAuthProviderSchema['user'],
    provider: UserAuthProviderSchema['provider'],
    payload: Omit<CreatePayload<UserAuthProviderSchema>, 'user' | 'provider'>,
  ) {
    return this.findOneAndUpdate(
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
