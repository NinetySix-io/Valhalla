import { CreatePayload } from '@odin/data.models/_base/factory';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { PasswordSchema } from '@odin/data.models/user.passwords/schema';
import { UserPasswordsModel } from '@odin/data.models/user.passwords';
import { UserSchema } from '@odin/data.models/users/schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  constructor(private readonly passwords: UserPasswordsModel) {}

  async create(password: CreatePayload<PasswordSchema>) {
    return this.passwords.create(password);
  }

  async findByUserId(userId: UserSchema['_id']) {
    return this.passwords
      .findOne({ user: userId })
      .orFail(new NotFoundException());
  }

  async validate(rawPassword: string, hashedPassword: string) {
    return this.passwords.validatePassword(rawPassword, hashedPassword);
  }
}
