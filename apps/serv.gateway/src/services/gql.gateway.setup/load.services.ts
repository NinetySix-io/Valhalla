import {
  GraphQLDataSource,
  SERVICE_DEFINITION_QUERY,
  ServiceEndpointDefinition,
} from '@apollo/gateway';

import { GraphQLDataSourceRequestKind } from '@apollo/gateway/dist/datasources/types';
import { GraphQLRequest } from 'apollo-server-types';
import { Headers } from 'headers-polyfill';
import { Logger } from '@nestjs/common';
import { ServiceDefinition } from '@apollo/federation-internals';
import { ServiceDefinitionUpdate } from '@apollo/gateway/dist/config';
import { parse } from 'graphql';

export type Service = ServiceEndpointDefinition & {
  dataSource: GraphQLDataSource;
};

export async function loadServicesFromRemoteEndpoint({
  serviceList,
  getServiceIntrospectionHeaders,
  serviceSdlCache,
}: {
  serviceList: Service[];
  getServiceIntrospectionHeaders: (
    service: ServiceEndpointDefinition,
  ) => Promise<HeadersInit | undefined>;
  serviceSdlCache: Map<string, string>;
}): Promise<ServiceDefinitionUpdate> {
  if (!serviceList || !serviceList.length) {
    throw new Error(
      'Tried to load services from remote endpoints but none provided',
    );
  }

  const logger = new Logger(loadServicesFromRemoteEndpoint.name);
  let isNewSchema = false;
  const serviceDefinitions: ServiceDefinition[] = [];
  for await (const { name, url, dataSource } of serviceList) {
    if (!url) {
      logger.warn(
        `Tried to load schema for '${name}' but no 'url' was specified.`,
      );

      continue;
    }

    const request: GraphQLRequest = {
      query: SERVICE_DEFINITION_QUERY,
      http: {
        url,
        method: 'POST',
        headers: new Headers(
          await getServiceIntrospectionHeaders({ name, url }),
        ),
      },
    };

    try {
      const { data, errors } = await dataSource.process({
        kind: GraphQLDataSourceRequestKind.LOADING_SCHEMA,
        request,
        context: {},
      });

      if (errors) {
        throw new Error(errors?.map((e: Error) => e.message).join('\n'));
      } else if (!data) {
        throw new Error('Unable to resolve schema');
      }

      const typeDefs = data._service.sdl as string;
      const previousDefinition = serviceSdlCache.get(name);
      // this lets us know if any downstream service has changed
      // and we need to recalculate the schema
      if (previousDefinition !== typeDefs) {
        isNewSchema = true;
      }
      serviceSdlCache.set(name, typeDefs);
      serviceDefinitions.push({
        name,
        url,
        typeDefs: parse(typeDefs),
      });
    } catch (e) {
      const error = e as Error;
      const errorMessage = `Couldn't load service definitions for "${name}" at ${url}: ${error?.message}`;
      logger.warn(errorMessage);
      continue;
    }
  }

  return {
    serviceDefinitions,
    isNewSchema,
  };
}
