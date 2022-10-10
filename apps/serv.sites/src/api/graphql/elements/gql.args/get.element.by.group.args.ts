import { ArgsType, PickType } from '@nestjs/graphql';

import { ElementMetaArgs } from './element.meta.args';

@ArgsType()
export class GetElementByGroupArgs extends PickType(ElementMetaArgs, [
  'groupId',
] as const) {}
