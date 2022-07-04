import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GqlExecutionContext, GqlOptionsFactory } from '@nestjs/graphql';

import { Injectable } from '@nestjs/common';
import { IntrospectAndCompose } from './introspect.and.compose';
import { RemoteDataSource } from './remote.data.source';
import { SubgraphsProvider } from './subgraphs.provider';
import { isDev } from '@valhalla/utilities';

@Injectable()
export class ApolloGatewaySetupProvider
  extends SubgraphsProvider
  implements GqlOptionsFactory<ApolloGatewayDriverConfig>
{
  private composer!: IntrospectAndCompose;

  async onSubgraphUpdated() {
    if (this.composer) {
      await this.composer.rebuildSupergraphSdl();
    }
  }

  private get cors() {
    if (isDev()) {
      return {
        origin: true,
        credentials: true,
      };
    }

    return true;
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
        context: (context: GqlExecutionContext) => context,
        playground: {
          endpoint: '/graphql',
          settings: {
            'request.credentials': 'same-origin',
          },
        },
        debug: isDev(),
        cors: this.cors,
      },
      gateway: {
        supergraphSdl: this.composer,
        buildService: ({ url }) =>
          new RemoteDataSource({
            url,
          }),
      },
    };
  }
}
