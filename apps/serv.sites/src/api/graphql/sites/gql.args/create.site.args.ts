import { ArgsType, PickType } from '@nestjs/graphql';

import { Site } from '../gql.types/site';

@ArgsType()
export class CreateSiteArgs extends PickType(Site, ['name'], ArgsType) {}
