import { ArgsType, PickType } from '@nestjs/graphql';

import { SiteMetaArgs } from './site.meta.args';

@ArgsType()
export class GetSiteArgs extends PickType(SiteMetaArgs, ['siteId'] as const) {}
