import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { PasswordSchema } from './schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserPasswordsModel extends BaseFactory<PasswordSchema> {
  constructor(
    @InjectModel(PasswordSchema)
    private readonly model: ModelType<PasswordSchema>,
  ) {
    super(model);
  }

  async validatePassword(rawPassword: string, hashedPassword: string) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}
