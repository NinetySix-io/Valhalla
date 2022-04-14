import { Ref, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { OrganizationSchema } from '../organizations/schema';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { simpleModel } from '../_base/decorators/simple.model';

@simpleModel('user.teams')
@caseInsensitiveIndex({ name: 1 }, { unique: true })
export class UserTeamSchema extends BaseSchema {
  @prop()
  name: string;

  @prop()
  avatar?: string;

  @prop({ ref: () => OrganizationSchema })
  organization: Ref<OrganizationSchema>;
}
