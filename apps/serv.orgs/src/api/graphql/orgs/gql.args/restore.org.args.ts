import { ArgsType, PickType } from '@nestjs/graphql';

import { OrgMetaArgs } from './org.meta.args';

@ArgsType()
export class RestoreOrgArgs extends PickType(OrgMetaArgs, ['orgId'] as const) {}
