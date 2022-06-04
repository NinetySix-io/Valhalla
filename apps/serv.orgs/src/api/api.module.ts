import { GqlOrganizationsModule } from './graphql/orgs/gql.orgs.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HealthModule, GqlOrganizationsModule],
})
export class ApiModule {}
