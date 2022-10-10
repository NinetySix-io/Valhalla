import { ArgsType, PickType } from '@nestjs/graphql';

import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class GetSectionArgs extends PickType(SectionMetaArgs, [
  'sectionId',
] as const) {}
