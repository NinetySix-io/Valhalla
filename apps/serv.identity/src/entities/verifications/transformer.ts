import { Verification as Proto } from '@app/protobuf';
import { VerificationSchema } from './schema';

export class VerificationTransformer extends VerificationSchema {
  constructor(entity: VerificationSchema) {
    super();
    Object.assign(this, entity);
  }

  get proto(): Proto {
    return {
      id: this.id,
      owner: this.owner.toHexString(),
      expiresAt: this.expiresAt.toString(),
    };
  }
}
