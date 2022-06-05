import { AccountSchema } from './schema';
import { DocumentType } from '@typegoose/typegoose';
import { Account as Proto } from '@app/protobuf';

export class AccountTransformer extends AccountSchema {
  constructor(entity: DocumentType<AccountSchema>) {
    super();
    Object.assign(this, entity.toObject({ virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      displayName: this.displayName,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      emails: this.emails.map((email) => ({
        isPrimary: email.isPrimary,
        value: email.value,
        isVerified: email.isVerified,
        createdAt: email.createdAt.toString(),
        updatedAt: email.updatedAt.toString(),
      })),
      phones: this.phones.map((phone) => ({
        isPrimary: phone.isPrimary,
        value: phone.value,
        isVerified: phone.isVerified,
        createdAt: phone.createdAt.toString(),
        updatedAt: phone.updatedAt.toString(),
      })),
    };
  }
}
