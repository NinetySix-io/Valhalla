import { BootConfigService } from '@app/services/boot.config.service';
import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { compare, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { VerificationSchema } from './schema';
import dayjs from 'dayjs';

@Injectable()
export class VerificationsModel extends BaseFactory<VerificationSchema> {
  constructor(
    @InjectModel(VerificationSchema) model: ModelType<VerificationSchema>,
    private readonly config: BootConfigService,
  ) {
    super(model);
  }

  /**
   * It takes a raw password and a hashed password and returns a promise that resolves to true if the
   * raw password matches the hashed password
   */
  validateCode(raw: string, hashed: string): Promise<boolean> {
    return compare(raw, hashed);
  }

  /**
   * It creates a new verification code for a user, hashes it, and saves it to the database
   */
  async generate(
    expiresAt: Date = dayjs().add(10, 'minutes').toDate(),
    owner?: VerificationSchema['owner'],
  ) {
    const code = this.config.verificationCode;
    const salt = this.config.verificationSalt;
    const hashed = await hash(code, salt);
    const verification = await this.create({
      owner,
      hashed,
      expiresAt,
    });

    return {
      code,
      verification,
    };
  }
}
