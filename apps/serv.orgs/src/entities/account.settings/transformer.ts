import { DocumentType, isDocument } from '@typegoose/typegoose';

import { AccountSettingSchema } from './schema';
import { AccountSettings as Proto } from '@app/protobuf';

export class AccountSettingTransformer extends AccountSettingSchema {
  constructor(
    entity: DocumentType<AccountSettingSchema> | AccountSettingSchema,
  ) {
    super();
    isDocument(entity)
      ? Object.assign(this, entity.toObject({ virtuals: false }))
      : entity;
  }

  get proto(): Proto {
    return {
      activeOrganizationId: this.activeOrg?.toHexString(),
    };
  }
}
