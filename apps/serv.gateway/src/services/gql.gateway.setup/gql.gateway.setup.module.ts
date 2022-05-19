import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';

import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { IntrospectAndCompose } from './introspect.and.compose';
import { SubgraphsProvider } from './subgraphs.provider';
import { isDev } from '@valhalla/utilities';

@Injectable()
export class ApolloGatewaySetupProvider
  extends SubgraphsProvider
  implements GqlOptionsFactory<ApolloGatewayDriverConfig>
{
  private composer: IntrospectAndCompose;

  onSubgraphUpdated(): void {
    if (this.composer) {
      this.composer.rebuildSupergraphSdl();
    }
  }

  createGqlOptions(): Omit<
    ApolloGatewayDriverConfig<ApolloGatewayDriver>,
    'driver'
  > {
    this.composer = new IntrospectAndCompose({
      subgraphs: () => this.subgraphs,
      subgraphHealthCheck: true,
    });

    return {
      server: {
        playground: true,
        debug: isDev(),
        cors: true,
      },
      gateway: {
        supergraphSdl: this.composer,
      },
    };
  }
}
