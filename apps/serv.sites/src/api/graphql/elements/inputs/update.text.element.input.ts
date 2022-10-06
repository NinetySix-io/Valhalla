import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';

import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';
import { PlatformPositionInput } from './platform.position.input';

@InputType()
export class UpdateTextElementInput extends PickType(
  PartialType(PageElementTextSchema),
  ['html', 'json'],
  InputType,
) {
  @Field(() => PlatformPositionInput, { nullable: true })
  desktop?: PlatformPositionInput;

  @Field(() => PlatformPositionInput, { nullable: true })
  tablet?: PlatformPositionInput;

  @Field(() => PlatformPositionInput, { nullable: true })
  mobile?: PlatformPositionInput;
}
