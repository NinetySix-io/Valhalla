import { GqlAccessModule } from './access/gql.access.module';
import { GqlUserModule } from './accounts/gql.accounts.module';

export const GqlModules = [GqlUserModule, GqlAccessModule];
