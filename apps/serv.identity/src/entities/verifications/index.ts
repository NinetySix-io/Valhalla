import { BootConfigService } from '@app/services/boot.config.service';
import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import * as bcrypt from 'bcryptjs';
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
   * @param {string} raw - The raw password that the user entered.
   * @param {string} hashed - The hashed password that was stored in the database.
   * @returns A promise that resolves to a boolean.
   */
  validateCode(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }

  /**
   * It creates a new verification code for a user, hashes it, and saves it to the database
   * @param owner - The owner of the verification code.
   * @param {Date} expiresAt - Date = dayjs().add(10, 'minutes').toDate(),
   * @returns A new verification code
   */
  async generate(
    owner: VerificationSchema['owner'],
    expiresAt: Date = dayjs().add(10, 'minutes').toDate(),
  ) {
    const code = this.config.verificationCode;
    const hashed = await bcrypt.hash(code);
    return this.create({
      owner,
      hashed,
      expiresAt,
    });
  }
}
