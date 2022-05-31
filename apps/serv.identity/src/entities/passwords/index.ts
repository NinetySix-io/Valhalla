import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from 'bcryptjs';
import { BootConfigService } from '@app/services/boot.config.service';
import { PasswordSchema } from './schema';

@Injectable()
export class PasswordsModel extends BaseFactory<PasswordSchema> {
  constructor(
    @InjectModel(PasswordSchema) model: ModelType<PasswordSchema>,
    private readonly bootConfig: BootConfigService,
  ) {
    super(model);
  }

  private get hashRound() {
    return this.bootConfig.passwordHashRounds;
  }

  validatePassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async createPassword(
    owner: PasswordSchema['owner'],
    password: string,
  ): Promise<void> {
    const hashed = await bcrypt.hash(password, this.hashRound);
    await this.create({ owner, hashed });
  }

  async updatePassword(owner: PasswordSchema['owner'], password: string) {
    const hashed = await bcrypt.hash(password, this.hashRound);
    const result = await this.updateOne({ owner }, { hashed });
    return result.modifiedCount > 0;
  }
}
