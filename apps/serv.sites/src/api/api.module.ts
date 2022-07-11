import { GqlComponentsModule } from './graphql/components/gql.components.module';
import { GqlElementsModule } from './graphql/elements/gql.elements.module';
import { GqlPagesModule } from './graphql/pages/gql.pages.module';
import { GqlSitesModule } from './graphql/sites/gql.sites.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HealthModule,
    GqlSitesModule,
    GqlPagesModule,
    GqlComponentsModule,
    GqlElementsModule,
  ],
})
export class ApiModule {}
