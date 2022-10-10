import {
  ArgsType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { Site } from '../gql.types/site';
import { SiteMetaArgs } from './site.meta.args';

@ArgsType()
export class UpdateSiteArgs extends IntersectionType(
  PickType(SiteMetaArgs, ['siteId'] as const, ArgsType),
  PartialType(PickType(Site, ['name'] as const, ArgsType)),
) {}
