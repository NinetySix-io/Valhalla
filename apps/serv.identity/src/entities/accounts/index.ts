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
          // TODO: Fix this
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // TODO: Fix this
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
   */
  findByValidEmail(email: string) {
    return this.findOne({ $or: this.getUsernameQuery('emails', email) });
  }

  /**
   * It returns a user document whose username matches the given username
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
   */
  findByValidPhone(phone: string) {
    return this.findOne({ $or: this.getUsernameQuery('phones', phone) });
  }

  /**
   * It checks if a phone number is already taken by another user
   */
  isPhoneTaken(phone: string) {
    return this.exists({ $or: this.getUsernameQuery('phones', phone) });
  }

  /**
   * It checks if the email is already taken by another user
   */
  isEmailTaken(email: string) {
    return this.exists({ $or: this.getUsernameQuery('emails', email) });
  }
}
