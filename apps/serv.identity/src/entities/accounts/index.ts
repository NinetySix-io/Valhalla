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
          $elemMath: {
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
   * It finds a user by email, but only if the email is either the primary email or a verified email
   * @param {string} email - The email address to search for.
   * @returns A promise that resolves to a user document.
   */
  findByValidEmail(email: string) {
    return this.findOne({
      $or: [
        {
          'email.value': email,
          isPrimary: true,
        },
        {
          'email.value': email,
          isVerified: true,
        },
      ],
    });
  }

  /**
   * It finds a user by phone number, but only if the phone number is either the primary phone number
   * or a verified phone number
   * @param {string} phone - The phone number to search for.
   * @returns A promise that resolves to a user document.
   */
  findByValidPhone(phone: string) {
    return this.findOne({
      $or: [
        {
          'phone.value': phone,
          isPrimary: true,
        },
        {
          'phone.value': phone,
          isVerified: true,
        },
      ],
    });
  }

  /**
   * It checks if a phone number is already taken by another user
   * @param {string} phone - string - the phone number to check
   * @returns A boolean value
   */
  isPhoneTaken(phone: string) {
    const trimmed = phone.trim();
    return this.exists({
      $or: [
        {
          'phones.value': trimmed,
          isVerified: true,
        },
        {
          'phones.value': trimmed,
          isPrimary: true,
        },
      ],
    });
  }

  /**
   * It checks if the email is already taken by another user
   * @param {string} email - The email address to check.
   * @returns A boolean value.
   */
  isEmailTaken(email: string) {
    const trimmed = email.trim();
    return this.exists({
      $or: [
        {
          'emails.value': trimmed,
          isVerified: true,
        },
        {
          'emails.value': trimmed,
          isPrimary: true,
        },
      ],
    });
  }
}
