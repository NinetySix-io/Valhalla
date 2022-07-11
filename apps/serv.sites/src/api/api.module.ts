import { GqlComponentsResolver } from './graphql/components/gql.components.resolver';
import { GqlPagesModule } from './graphql/pages/gql.pages.module';
import { GqlSitesModule } from './graphql/sites/gql.sites.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HealthModule,
    GqlSitesModule,
    GqlPagesModule,
    GqlComponentsResolver,
  ],
})
export class ApiModule {}
