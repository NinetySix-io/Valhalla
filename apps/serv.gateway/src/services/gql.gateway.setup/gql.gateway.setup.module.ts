import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GqlExecutionContext, GqlOptionsFactory } from '@nestjs/graphql';

import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { IntrospectAndCompose } from './introspect.and.compose';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { SubgraphsProvider } from './subgraphs.provider';
import { isDev } from '@valhalla/utilities';

@Injectable()
export class ApolloGatewaySetupProvider
  extends SubgraphsProvider
  implements GqlOptionsFactory<ApolloGatewayDriverConfig>
{
  private composer: IntrospectAndCompose;

  async onSubgraphUpdated() {
    if (this.composer) {
      await this.composer.rebuildSupergraphSdl();
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
        context: (context: GqlExecutionContext) => context,
        playground: {
          endpoint: '/graphql',
          settings: {
            'request.credentials': 'same-origin',
          },
        },
        debug: isDev(),
        cors: true,
      },
      gateway: {
        supergraphSdl: this.composer,
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              const fastifyReq: FastifyRequest = context.request;
              if (fastifyReq) {
                for (const [key, value] of Object.entries(fastifyReq.headers)) {
                  if (typeof value === 'string') {
                    request.http.headers.set(key, value);
                  }
                }
              }
            },
          }),
      },
    };
  }
}
