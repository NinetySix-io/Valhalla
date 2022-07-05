import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
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
   * Delete all unverified emails that are not primary emails
   *
   * @param {string} email - The email address to delete.
   * @returns A promise that resolves to the number of documents that were updated.
   */
  deleteAllUnverifiedEmails(email: string) {
    return this.updateMany(
      {
        emails: {
          $elemMatch: {
            value: email,
            isVerified: false,
            isPrimary: false,
          },
        },
      },
      {
        $pull: {
          emails: {
            value: email,
            isVerified: false,
            isPrimary: false,
          },
        },
      },
    );
  }

  /**
   * It deletes all unverified phones that are not primary phones
   * @param {string} phone - string - the phone number to be deleted
   * @returns A promise that resolves to the number of documents that were updated.
   */
  deleteAllUnverifiedPhone(phone: string) {
    return this.updateMany(
      {
        phones: {
          $elemMath: {
            value: phone,
            isVerified: false,
            isPrimary: false,
          },
        },
      },
      {
        $pull: {
          phones: {
            value: phone,
            isVerified: false,
            isPrimary: false,
          },
        },
      },
    );
  }

  /**
   * It returns an array of objects that can be used as a query to find a user by their phone number or
   * email address
   * @param {'phones' | 'emails'} type - 'phones' | 'emails'
   * @param {string} value - The value of the phone number or email address
   * @returns An array of objects.
   */
  private getUsernameQuery(type: 'phones' | 'emails', value: string) {
    return [
      {
        [`${type}.value`]: value.trim(),
        [`${type}.isPrimary`]: true,
      },
      {
        [`${type}.value`]: value.trim(),
        [`${type}.isVerified`]: true,
      },
    ];
  }

  /**
   * It finds a user by email, but only if the email is either the primary email or a verified email
   * @param {string} email - The email address to search for.
   * @returns A promise that resolves to a user document.
   */
  findByValidEmail(email: string) {
    return this.findOne({ $or: this.getUsernameQuery('emails', email) });
  }

  /**
   * It returns a user document whose username matches the given username
   * @param {string} username - The username to search for.
   * @returns A promise that resolves to a user document.
   */
  findByUsername(username: string) {
    return this.findOne({
      $or: this.getUsernameQuery('emails', username).concat(
        this.getUsernameQuery('phones', username),
      ),
    });
  }

  /**
   * It finds a user by phone number, but only if the phone number is either the primary phone number
   * or a verified phone number
   * @param {string} phone - The phone number to search for.
   * @returns A promise that resolves to a user document.
   */
  findByValidPhone(phone: string) {
    return this.findOne({ $or: this.getUsernameQuery('phones', phone) });
  }

  /**
   * It checks if a phone number is already taken by another user
   * @param {string} phone - string - the phone number to check
   * @returns A boolean value
   */
  isPhoneTaken(phone: string) {
    return this.exists({ $or: this.getUsernameQuery('phones', phone) });
  }

  /**
   * It checks if the email is already taken by another user
   * @param {string} email - The email address to check.
   * @returns A boolean value.
   */
  isEmailTaken(email: string) {
    return this.exists({ $or: this.getUsernameQuery('emails', email) });
  }
}
