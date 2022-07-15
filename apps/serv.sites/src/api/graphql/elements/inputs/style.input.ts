import { Field, InputType, PickType } from '@nestjs/graphql';

import { DirectionalSchema } from '@app/entities/elements/schemas/directional.schema';
import { StyleSchema } from '@app/entities/elements/schemas/style.schema';

@InputType()
class DirectionalInput extends PickType(
  DirectionalSchema,
  ['top', 'bottom', 'left', 'right'] as const,
  InputType,
) {}

@InputType()
export class StyleInput extends PickType(StyleSchema, [] as const, InputType) {
  @Field({ nullable: true })
  top?: DirectionalInput;

  @Field({ nullable: true })
  bottom?: DirectionalInput;

  @Field({ nullable: true })
  left?: DirectionalInput;

  @Field({ nullable: true })
  right?: DirectionalInput;
}
