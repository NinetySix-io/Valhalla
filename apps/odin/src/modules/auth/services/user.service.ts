import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { CreatePayload } from '@odin/data.models/_base/factory';
import type { PartialBy } from '@odin/types/common';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserSchema } from '@odin/data.models/users/schema';
import { UsersModel } from '@odin/data.models/users';
import { decode } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly users: UsersModel,
    private readonly authProviders: UserAuthProvidersModel,
  ) {}

  async create(newUser: CreatePayload<UserSchema>) {
    const user = await this.users.create(newUser);
    return user.toJSON();
  }

  async findOrCreate(
    user: PartialBy<
      Pick<UserSchema, 'email' | 'avatar' | 'displayName'>,
      'displayName' | 'avatar'
    >,
  ) {
    const existing = await this.findByEmail(user.email);
    return (
      existing ??
      this.create({
        email: user.email,
        displayName: user.displayName || user.email,
        avatar: user.avatar,
      })
    );
  }

  async findById(id: string) {
    const user = await this.users.findById(id).orFail(new NotFoundException());
    return user.toJSON();
  }

  async findByEmail(email: string) {
    const user = await this.users
      .findOne({ email })
      .orFail(new NotFoundException());

    return user.toJSON();
  }

  async isUsernameAvailable(username: string) {
    return this.users.exists({ email: username });
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
