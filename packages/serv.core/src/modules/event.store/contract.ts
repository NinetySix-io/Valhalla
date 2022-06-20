/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectionSettings, TcpEndPoint } from 'node-eventstore-client';
import {
  EventStorePersistentSubscription as ESStorePersistentSub,
  EventStoreSubscription as ESVolatileSubscription,
  EventStoreCatchUpSubscription,
} from 'node-eventstore-client';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { ClientOpts } from 'node-nats-streaming';
import { IEvent } from '@nestjs/cqrs';
import Long from 'long';
import { Subscription } from 'node-nats-streaming';

export const ProvidersConstants = {
  EVENT_STORE_PROVIDER: 'EVENT_STORE_PROVIDER',
  EVENT_STORE_STREAM_CONFIG_PROVIDER: 'EsStreamConfig',
  EVENT_STORE_CONNECTION_CONFIG_PROVIDER: 'EsConnectionConfig',
} as const;

export const NEST_EVENTSTORE_OPTION = 'NEST_EVENTSTORE_OPTION' as const;
export const NEST_EVENTSTORE_FEATURE_OPTION =
  'NEST_EVENTSTORE_FEATURE_OPTION' as const;
export const NEST_EVENTSTORE_MODULE_ID = 'NEST_EVENTSTORE_MODULE_ID' as const;
export const EVENT_STORE_CONFIG = 'EVENT_STORE_CONFIG' as const;
export const EVENT_STORE_STORAGE_ADAPTER =
  'EVENT_STORE_STORAGE_ADAPTER' as const;

export interface IAdapterStore {
  storeKey: string;
  write(key: string, value: number): Promise<number>;
  read(key: string): Promise<number>;
  clear(): number;
}

export type BrokerTypes = 'event-store' | 'nats';

export interface IEventStoreMessage {
  streamId: string;
  eventId: string;
  eventNumber: number;
  eventType: string;
  created: Date;
  metadata: object;
  isJson: boolean;
  data: object;
}

export enum EventStoreSubscriptionType {
  Persistent,
  CatchUp,
  Volatile,
}

export interface EventStorePersistentSubscription {
  type: EventStoreSubscriptionType.Persistent;
  stream: string;
  persistentSubscriptionName: string;
  resolveLinkTos?: boolean;
}

export interface EventStoreCatchupSubscription {
  type: EventStoreSubscriptionType.CatchUp;
  stream: string;
  resolveLinkTos?: boolean;
  lastCheckpoint?: Long | number | null;
}

export interface EventStoreVolatileSubscription {
  type: EventStoreSubscriptionType.Volatile;
  stream: string;
  resolveLinkTos?: boolean;
}

export interface NatsEventStorePersistentSubscription {
  type: EventStoreSubscriptionType.Persistent;
  stream: string;
  durableName: string;
  maxInflight?: number;
  startAt?: number;
  ackWait?: number;
  manualAcks?: boolean;
}

export interface NatsEventStoreVolatileSubscription {
  type: EventStoreSubscriptionType.Volatile;
  stream: string;
  startAt?: number;
  maxInflight?: number;
  ackWait?: number;
  manualAcks?: boolean;
}

export type EventStoreSubscription =
  | EventStorePersistentSubscription
  | EventStoreCatchupSubscription
  | EventStoreVolatileSubscription;

export type NatsEventStoreSubscription =
  | NatsEventStorePersistentSubscription
  | NatsEventStoreVolatileSubscription;

export interface IEventConstructors {
  [key: string]: (...args: any[]) => IEvent;
}

export interface ExtendedCatchUpSubscription
  extends EventStoreCatchUpSubscription {
  type: 'catch';
  isLive: boolean | undefined;
}

export interface ExtendedPersistentSubscription extends ESStorePersistentSub {
  type: 'persistent';
  isLive?: boolean | undefined;
}

export interface ExtendedVolatileSubscription extends ESVolatileSubscription {
  type: 'volatile';
  isLive?: boolean | undefined;
}

export interface ExtendedNatsPersistentSubscription extends Subscription {
  type: 'persistent';
  isLive?: boolean | undefined;
}

export interface ExtendedNatsVolatileSubscription extends Subscription {
  type: 'volatile';
  isLive?: boolean | undefined;
}

export type EventStoreOptionConfig =
  | {
      type: 'event-store';
      subscriptions: EventStoreSubscription[];
      eventHandlers: IEventConstructors;
      featureStreamName?: string;
      store?: IAdapterStore;
    }
  | {
      type: 'nats';
      subscriptions: NatsEventStoreSubscription[];
      eventHandlers: IEventConstructors;
      featureStreamName?: string;
    };

export type EventStoreModuleOptions =
  | {
      type: 'event-store';
      options: ConnectionSettings;
      tcpEndpoint: TcpEndPoint;
    }
  | {
      type: 'nats';
      clusterId: string;
      clientId?: string;
      groupId?: string;
      options: ClientOpts;
    };

export interface EventStoreOptionsFactory {
  createEventStoreOptions(
    connectionName?: string,
  ): Promise<EventStoreModuleOptions> | EventStoreModuleOptions;
}

export interface EventStoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  type: BrokerTypes;
  name?: string;
  useExisting?: Type<EventStoreOptionsFactory>;
  useClass?: Type<EventStoreOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EventStoreModuleOptions> | EventStoreModuleOptions;
  inject?: any[];
}

export interface EventStoreFeatureOptionsFactory {
  createFeatureOptions(
    connectionName?: string,
  ): Promise<EventStoreOptionConfig> | EventStoreOptionConfig;
}

export interface EventStoreFeatureAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  type: BrokerTypes;
  useExisting?: Type<EventStoreFeatureOptionsFactory>;
  useClass?: Type<EventStoreFeatureOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EventStoreOptionConfig> | EventStoreOptionConfig;
  inject?: any[];
}
