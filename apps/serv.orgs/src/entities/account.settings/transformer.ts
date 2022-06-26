import { AccountSettingSchema } from './schema';
import { AccountSettings as Proto } from '@app/protobuf';
import { typegoose } from '@valhalla/serv.core';

export class AccountSettingTransformer extends AccountSettingSchema {
  constructor(
    entity: typegoose.DocumentType<AccountSettingSchema> | AccountSettingSchema,
  ) {
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
      activeOrganizationId: this.activeOrg?.toHexString(),
    };
  }
}
