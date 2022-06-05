import { RefreshToken as Proto } from '@app/protobuf';
import { RefreshTokenSchema } from './schema';

export class RefreshTokenTransformer extends RefreshTokenSchema {
  constructor(entity: RefreshTokenSchema) {
    super();
    Object.assign(this, entity);
  }

  get proto(): Proto {
    return {
      id: this.id,
      expiresAt: this.expiresAt.toString(),
      account: this.account.toHexString(),
    };
  }
}
