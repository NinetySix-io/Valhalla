import { ObjectType, PickType } from '@nestjs/graphql';

import { OrganizationSchema } from '@app/entities/organizations/schema';

@ObjectType()
export class OrganizationBySlugResponse extends PickType(OrganizationSchema, [
  'id',
  'name',
]) {}
