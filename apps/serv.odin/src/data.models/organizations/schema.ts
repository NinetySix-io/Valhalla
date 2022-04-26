import { Field, ObjectType } from '@nestjs/graphql';

import { BaseSchema } from '@serv.odin/data.models/_base/schema';
import { Expose } from 'class-transformer';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { prop } from '@typegoose/typegoose';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('organizations')
@caseInsensitiveIndex({ name: 1 }, { unique: true })
export class OrganizationSchema extends BaseSchema {
  @Field({ description: 'Organization name' })
  @Expose()
  @prop()
  name: string;

  @Field({ nullable: true, description: 'Organization logo' })
  @Expose()
  @prop()
  logo?: string;
}
