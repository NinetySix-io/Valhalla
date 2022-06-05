import { GqlAccessModule } from './graphql/access/gql.access.module';
import { GqlAccountModule } from './graphql/accounts/gql.accounts.module';
import { GqlVerificationModule } from './graphql/verification/gql.verification.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HealthModule,
    GqlAccessModule,
    GqlAccountModule,
    GqlVerificationModule,
  ],
})
export class ApiModule {}
