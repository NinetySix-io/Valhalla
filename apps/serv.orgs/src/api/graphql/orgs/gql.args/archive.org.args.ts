import { ArgsType, PickType } from '@nestjs/graphql';

import { OrgMetaArgs } from './org.meta.args';

@ArgsType()
export class ArchiveOrgArgs extends PickType(OrgMetaArgs, ['orgId'] as const) {}
