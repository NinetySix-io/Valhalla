import { InputType, PickType } from '@nestjs/graphql';

import { OrganizationSchema } from '@app/entities/organizations/schema';

@InputType()
export class CreateOrganizationInput extends PickType(
  OrganizationSchema,
  ['name', 'plan'] as const,
  InputType,
) {}
