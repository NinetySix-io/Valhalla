import { Verification as Proto } from '@app/protobuf';
import { VerificationSchema } from './schema';
import { typegoose } from '@valhalla/serv.core';

export class VerificationTransformer extends VerificationSchema {
  constructor(entity: typegoose.DocumentType<VerificationSchema>) {
    super();
    Object.assign(this, entity.toObject({ virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      owner: this.owner?.toHexString(),
      expiresAt: this.expiresAt.toString(),
    };
  }
}
