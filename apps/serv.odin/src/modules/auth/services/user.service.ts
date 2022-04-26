import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthProvider } from '@serv.odin/data.models/user.auth.providers/schema';
import { UserAuthProvidersModel } from '@serv.odin/data.models/user.auth.providers';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { UsersModel } from '@serv.odin/data.models/users';
import { decode } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly users: UsersModel,
    private readonly authProviders: UserAuthProvidersModel,
  ) {}

  async findById(id: string) {
    const user = await this.users.findById(id).orFail(new NotFoundException());
    return user.toJSON();
  }

  async linkAuthProvider(
    user: UserSchema['_id'],
    provider: AuthProvider,
    token: string,
  ): Promise<boolean> {
    //TODO: wtf is in here?
    const decodedToken = decode(token);
    const result = await this.authProviders.updateOne(
      { user, provider },
      { $set: { accessToken: token } },
      { upsert: true },
    );

    return result.modifiedCount > 0 || result.upsertedCount > 0;
  }

  async unlinkAuthProvider(
    user: UserSchema['_id'],
    provider: AuthProvider,
  ): Promise<boolean> {
    const result = await this.authProviders.deleteOne({
      user,
      provider,
    });

    return result.deletedCount > 0;
  }
}
