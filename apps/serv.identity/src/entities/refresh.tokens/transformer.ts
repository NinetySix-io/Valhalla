import { DocumentType } from '@typegoose/typegoose';
import { RefreshToken as Proto } from '@app/protobuf';
import { RefreshTokenSchema } from './schema';

export class RefreshTokenTransformer extends RefreshTokenSchema {
  constructor(entity: DocumentType<RefreshTokenSchema>) {
    super();
    Object.assign(this, entity.toObject({ virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      expiresAt: this.expiresAt.toString(),
      account: this.account.toHexString(),
    };
  }
}
