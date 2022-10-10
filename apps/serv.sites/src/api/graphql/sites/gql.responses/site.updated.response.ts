import { ObjectType, PickType } from '@nestjs/graphql';

import { Site } from '../gql.types/site';

@ObjectType()
export class SiteUpdatedResponse extends PickType(
  Site,
  ['id', 'status', 'name', 'url'],
  ObjectType,
) {}
