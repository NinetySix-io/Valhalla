import { AccountSchema } from './schema';
import { Account as Proto } from '@app/protobuf';
import { typegoose } from '@valhalla/serv.core';

export class AccountTransformer extends AccountSchema {
  constructor(entity: typegoose.DocumentType<AccountSchema> | AccountSchema) {
    super();
    Object.assign(
      this,
      typegoose.isDocument(entity)
        ? entity.toObject({ virtuals: false })
        : entity,
    );
  }

  get proto(): Proto {
    return {
      id: this.id,
      displayName: this.displayName,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      emails: this.emails,
      phones: this.phones,
    };
  }
}
