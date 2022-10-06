import { InputType, PickType } from '@nestjs/graphql';

import { PageElementPlatformSchema } from '@app/entities/page.elements/schemas/platform.schema';

@InputType()
export class PlatformPositionInput extends PickType(
  PageElementPlatformSchema,
  ['height', 'width', 'x', 'y', 'isVisible'],
  InputType,
) {}
