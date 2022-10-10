import { ObjectType, PickType } from '@nestjs/graphql';

import { Page } from '../gql.types/page';

@ObjectType()
export class PageUpdatedResponse extends PickType(
  Page,
  ['id', 'status'],
  ObjectType,
) {}
