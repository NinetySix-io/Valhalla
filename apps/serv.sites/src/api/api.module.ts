import { GqlPagesModule } from './graphql/pages/gql.pages.module';
import { GqlSitesModule } from './graphql/sites/gql.sites.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HealthModule, GqlSitesModule, GqlPagesModule],
})
export class ApiModule {}
