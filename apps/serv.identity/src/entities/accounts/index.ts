import { Injectable } from '@nestjs/common';
import { BaseFactory, CreatePayload, ModelType } from '@valhalla/serv.core';
import { compact, PartialBy } from '@valhalla/utilities';
import { InjectModel } from 'nestjs-typegoose';
import { AccountSchema } from './schema';

@Injectable()
export class AccountsModel extends BaseFactory<AccountSchema> {
  constructor(
    @InjectModel(AccountSchema)
    model: ModelType<AccountSchema>,
  ) {
    super(model);
  }

  /**
   * It creates a user with the given firstName, lastName, displayName, email, and phone
   * @param user
   * @returns A promise that resolves to a Accountschema
   */
  createAccount(
    user: PartialBy<
      CreatePayload<
        Omit<AccountSchema, 'emails' | 'phones'> & {
          email: string;
          phone: string;
        }
      >,
      'displayName' | 'phone'
    >,
  ) {
    const displayName = user.displayName || user.firstName || user.email;
    return this.create({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      displayName,
      emails: [
        {
          value: user.email,
          isPrimary: true,
          isVerified: false,
        },
      ],
      phones: compact([
        user.phone && {
          value: user.phone,
          isPrimary: true,
          isVerified: false,
        },
      ]),
    });
  }

  /**
   * It finds a user by username, where username is either the primary email or the primary phone
   * number
   * @param {string} username - The username to search for.
   * @returns A promise that resolves to a user object.
   */
  findByUsername(username: string) {
    return this.findOne({
      $or: [
        {
          'emails.value': username.trim(),
          'emails.isPrimary': true,
        },
        {
          'phones.value': username.trim(),
          'phones.isPrimary': true,
        },
      ],
    });
  }

  /**
   * Check if a user exists with the given phone number.
   * @param {string} phone - The phone number to check for.
   * @returns A boolean value.
   */
  phoneExists(phone: string) {
    return this.exists({ 'phones.value': phone.trim() });
  }

  /**
   * It returns true if the email exists in the database
   * @param {string} email - string - the email address to check
   * @returns A boolean value.
   */
  emailExists(email: string) {
    return this.exists({ 'emails.value': email.trim() });
  }
}
