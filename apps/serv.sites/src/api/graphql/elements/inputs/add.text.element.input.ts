import { Field, InputType, PickType } from '@nestjs/graphql';

import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';
import { PlatformPositionInput } from './platform.position.input';

@InputType()
export class AddTextElementInput extends PickType(
  PageElementTextSchema,
  ['html', 'json'],
  InputType,
) {
  @Field(() => PlatformPositionInput)
  desktop: PlatformPositionInput;

  @Field(() => PlatformPositionInput, { nullable: true })
  tablet?: PlatformPositionInput;

  @Field(() => PlatformPositionInput, { nullable: true })
  mobile?: PlatformPositionInput;
}
