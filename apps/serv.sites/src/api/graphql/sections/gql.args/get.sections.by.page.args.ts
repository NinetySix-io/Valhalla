import { ArgsType, PickType } from '@nestjs/graphql';

import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class GetSectionsByPageArgs extends PickType(SectionMetaArgs, [
  'pageId',
] as const) {}
