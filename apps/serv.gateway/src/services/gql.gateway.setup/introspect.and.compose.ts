import { Service, loadServicesFromRemoteEndpoint } from './load.services';
import {
  ServiceDefinitionUpdate,
  SupergraphSdlHookOptions,
} from '@apollo/gateway/dist/config';
import {
  ServiceEndpointDefinition,
  SubgraphHealthCheckFunction,
  SupergraphManager,
  SupergraphSdlUpdateFunction,
} from '@apollo/gateway';

import { Logger } from '@nestjs/common';
import { composeServices } from '@apollo/composition';
import fs from 'fs';
import path from 'path';
import { HeadersInit } from './types';

export interface IntrospectAndComposeOptions {
  subgraphs: ServiceEndpointDefinition[] | (() => ServiceEndpointDefinition[]);
  logger?: Logger;
  introspectionHeaders?:
    | HeadersInit
    | ((
        service: ServiceEndpointDefinition,
      ) => Promise<HeadersInit | undefined> | HeadersInit);
  pollIntervalInMs?: number;
  subgraphHealthCheck?: boolean;
}

type State =
  | { phase: 'initialized' }
  | { phase: 'polling'; pollingPromise?: Promise<void> }
  | { phase: 'stopped' };

export class IntrospectAndCompose implements SupergraphManager {
  private logger = new Logger(IntrospectAndCompose.name);
  private config: IntrospectAndComposeOptions;
  private update?: SupergraphSdlUpdateFunction;
  private healthCheck?: SubgraphHealthCheckFunction;
  private subgraphs?: Service[];
  private serviceSdlCache: Map<string, string> = new Map();
  private timerRef: NodeJS.Timeout | null = null;
  private state: State;
  private buildSubgraph!: () => void;
  private fallbackPath = path.resolve(__dirname, 'fallback.graphql');
  private fallbackSupergraphSdl = fs.readFileSync(this.fallbackPath, {
    encoding: 'utf-8',
  });

  constructor(options: IntrospectAndComposeOptions) {
    this.config = options;
    this.state = { phase: 'initialized' };
  }

  /**
   * It initializes the state of the hook, and returns a function that can be used to clean up the hook
   */
  public async initialize({
    update,
    getDataSource,
    healthCheck,
  }: SupergraphSdlHookOptions) {
    this.update = update;

    if (this.config.subgraphHealthCheck) {
      this.healthCheck = healthCheck;
    }

    this.buildSubgraph = () => {
      const subgraphs =
        typeof this.config.subgraphs === 'function'
          ? this.config.subgraphs()
          : this.config.subgraphs;

      this.subgraphs = subgraphs.map((subgraph) => ({
        ...subgraph,
        dataSource: getDataSource(subgraph),
      }));
    };

    let initialSupergraphSdl: string | null = null;
    try {
      initialSupergraphSdl = await this.updateSupergraphSdl();
    } catch (e) {
      this.logUpdateFailure(e as Error);
      throw e;
    }

    return {
      // on init, this supergraphSdl should never actually be `null`.
      // `this.updateSupergraphSdl()` will only return null if the schema hasn't
      // changed over the course of an _update_.
      supergraphSdl: initialSupergraphSdl || this.fallbackSupergraphSdl,
      cleanup: async () => {
        if (this.state.phase === 'polling') {
          await this.state.pollingPromise;
        }
        this.state = { phase: 'stopped' };
        if (this.timerRef) {
          clearTimeout(this.timerRef);
          this.timerRef = null;
        }
      },
    };
  }

  /**
   * It takes a list of subgraphs, fetches their SDLs, and then creates a supergraph SDL from them
   */
  private async updateSupergraphSdl() {
    this.buildSubgraph();

    if (!this.subgraphs?.length) {
      return this.fallbackSupergraphSdl;
    }

    const result = await loadServicesFromRemoteEndpoint({
      serviceList: this.subgraphs,
      serviceSdlCache: this.serviceSdlCache,
      getServiceIntrospectionHeaders: async (service) => {
        return typeof this.config.introspectionHeaders === 'function'
          ? await this.config.introspectionHeaders(service)
          : this.config.introspectionHeaders;
      },
    });

    if (!result.serviceDefinitions?.length) {
      return this.fallbackSupergraphSdl;
    }

    if (!result.isNewSchema) {
      return null;
    }

    const validSubgraphs = this.filterInvalidSubgraphs(
      result.serviceDefinitions,
    );

    if (!validSubgraphs.length) {
      return this.fallbackSupergraphSdl;
    }

    const supergraphSdl = this.createSupergraphFromSubgraphList(validSubgraphs);
    // the healthCheck fn is only assigned if it's enabled in the config
    await this.healthCheck?.(supergraphSdl);
    return supergraphSdl;
  }

  /**
   * It takes a list of subgraphs, and returns a list of subgraphs that are valid
   */
  private filterInvalidSubgraphs(
    subgraphs: ServiceDefinitionUpdate['serviceDefinitions'] = [],
  ) {
    const result: ServiceDefinitionUpdate['serviceDefinitions'] = [];

    for (const subgraph of subgraphs) {
      const composition = composeServices([subgraph]);
      if (!composition.errors) {
        result.push(subgraph);
      } else {
        this.logger.warn(
          `Unable to register subgraph: ${subgraph.name}`,
          composition.errors.map((e) => e.message),
        );
      }
    }

    return result;
  }

  /**
   * It takes a list of subgraphs and returns a supergraph
   */
  private createSupergraphFromSubgraphList(
    subgraphs: ServiceDefinitionUpdate['serviceDefinitions'] = [],
  ) {
    const compositionResult = composeServices(subgraphs);

    if (compositionResult.errors) {
      const { errors } = compositionResult;
      throw Error(
        "A valid schema couldn't be composed. The following composition errors were found:\n" +
          errors.map((e) => '\t' + e.message).join('\n'),
      );
    } else {
      const { supergraphSdl } = compositionResult;
      return supergraphSdl;
    }
  }

  /**
   * It tries to update the supergraph SDL, and if it succeeds, it calls the update function
   */
  async rebuildSupergraphSdl() {
    try {
      const maybeNewSupergraphSdl = await this.updateSupergraphSdl();
      if (maybeNewSupergraphSdl) {
        this.update?.(maybeNewSupergraphSdl);
      }
    } catch (e) {
      this.logUpdateFailure(e as Error);
    }
  }

  private logUpdateFailure(e: Error) {
    this.config.logger?.error(
      'IntrospectAndCompose failed to update supergraph with the following error',
      e,
    );
  }
}
