import { modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';

@modelOptions({
  schemaOptions: {
    collection: 'organizations',
    timestamps: true,
  },
})
@caseInsensitiveIndex({ name: 1 }, { unique: true })
export class OrganizationSchema extends BaseSchema {
  @prop()
  name: string;

  @prop()
  logo?: string;
}
