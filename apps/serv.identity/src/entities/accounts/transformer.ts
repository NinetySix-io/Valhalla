import { AccountSchema } from './schema';
import { Account as Proto } from '@app/rpc/protobuf';

export class AccountTransformer {
  entity: AccountSchema;

  constructor(entity: AccountSchema) {
    this.entity = entity;
  }

  get proto(): Proto {
    return {
      id: this.entity.id,
      displayName: this.entity.displayName,
      firstName: this.entity.firstName,
      lastName: this.entity.lastName,
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
      emails: this.entity.emails.map((email) => ({
        isPrimary: email.isPrimary,
        value: email.value,
        isVerified: email.isVerified,
        verificationCode: email.verificationCode,
        createdAt: email.createdAt.toString(),
        updatedAt: email.updatedAt.toString(),
      })),
      phones: this.entity.phones.map((phone) => ({
        isPrimary: phone.isPrimary,
        value: phone.value,
        isVerified: phone.isVerified,
        verificationCode: phone.verificationCode,
        createdAt: phone.createdAt.toString(),
        updatedAt: phone.updatedAt.toString(),
      })),
    };
  }
}
