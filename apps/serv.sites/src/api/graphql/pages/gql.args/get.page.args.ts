import { ArgsType, PickType } from '@nestjs/graphql';

import { PageMetaArgs } from './page.meta.args';

@ArgsType()
export class GetPageArgs extends PickType(PageMetaArgs, ['pageId'] as const) {}
