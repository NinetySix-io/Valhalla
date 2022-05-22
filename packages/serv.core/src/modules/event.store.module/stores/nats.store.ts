/* eslint-disable @typescript-eslint/no-explicit-any */
/* tslint:disable:variable-name */

import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  EventBus,
  IEvent,
  IEventPublisher,
  IMessageSource,
} from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { Message } from 'node-nats-streaming';
import { Subject } from 'rxjs';
import { NatsEventStoreBroker } from '../brokers/nats.store.broker';
import {
  EventStoreModuleOptions,
  EventStoreOptionConfig,
  EventStoreSubscriptionType,
  ExtendedNatsPersistentSubscription,
  ExtendedNatsVolatileSubscription,
  IEventConstructors,
  NatsEventStorePersistentSubscription as ESPersistentSubscription,
  NatsEventStoreVolatileSubscription as ESVolatileSubscription,
  ProvidersConstants,
} from '../contract';

/**
 * @class EventStore
 */
@Injectable()
export class NatsEventStore
  implements IEventPublisher, OnModuleDestroy, OnModuleInit, IMessageSource
{
  private logger = new Logger(this.constructor.name);
  private eventStore!: NatsEventStoreBroker;
  private eventHandlers!: IEventConstructors;
  private subject$!: Subject<IEvent>;
  private readonly featureStream?: string;

  private persistentSubscriptions: ExtendedNatsPersistentSubscription[] = [];
  private persistentSubscriptionsCount!: number;

  private volatileSubscriptions: ExtendedNatsVolatileSubscription[] = [];
  private volatileSubscriptionsCount!: number;

  constructor(
    @Inject(ProvidersConstants.EVENT_STORE_PROVIDER) eventStore: any,
    @Inject(ProvidersConstants.EVENT_STORE_CONNECTION_CONFIG_PROVIDER)
    private readonly configService: EventStoreModuleOptions,
    @Inject(ProvidersConstants.EVENT_STORE_STREAM_CONFIG_PROVIDER)
    private readonly esStreamConfig: EventStoreOptionConfig,
    private readonly explorerService: ExplorerService,
    private readonly eventsBus: EventBus,
  ) {
    this.eventStore = eventStore;
    this.featureStream = esStreamConfig.featureStreamName;
    this.addEventHandlers(esStreamConfig.eventHandlers);

    if (configService.type === 'nats') {
      this.eventStore.connect(
        configService.clusterId,
        configService.clientId,
        configService.options,
      );
    } else {
      throw new Error(
        'Event store type is not supported  - (nats-event-store.ts)',
      );
    }

    this.initSubs();
    this.eventStore.getClient().on('connect', () => {
      this.initSubs();
    });
  }

  private initSubs() {
    if (this.esStreamConfig.type === 'nats') {
      const persistentSubscriptions = this.esStreamConfig.subscriptions.filter(
        (sub) => {
          return sub.type === EventStoreSubscriptionType.Persistent;
        },
      );
      const volatileSubscriptions = this.esStreamConfig.subscriptions.filter(
        (sub) => {
          return sub.type === EventStoreSubscriptionType.Volatile;
        },
      );

      this.subscribeToPersistentSubscriptions(
        persistentSubscriptions as ESPersistentSubscription[],
      );
      this.subscribeToVolatileSubscriptions(
        volatileSubscriptions as ESVolatileSubscription[],
      );
    } else {
      throw new Error(
        'Event store type is not supported for feature - nats-event-store.ts',
      );
    }
  }

  async publish(event: IEvent & { handlerType?: string }, stream?: string) {
    if (event === undefined) {
      return;
    }
    if (event === null) {
      return;
    }

    event.handlerType = event?.constructor?.name;
    const payload = Buffer.from(JSON.stringify(event));

    const streamName = stream ?? this.featureStream ?? '';
    const streamId = this.getStreamId(streamName);

    try {
      await this.eventStore.getClient().publish(streamId, payload);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private getStreamId(stream: string) {
    return `nest-event-store-${stream}`;
  }

  async subscribeToPersistentSubscriptions(
    subscriptions: ESPersistentSubscription[],
  ) {
    if (!this.eventStore.isConnected) {
      return;
    }
    this.persistentSubscriptionsCount = subscriptions.length;
    this.persistentSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        return await this.subscribeToPersistentSubscription(
          this.getStreamId(subscription.stream),
          subscription.durableName,
          subscription?.startAt,
          subscription.maxInflight,
          subscription?.ackWait,
          subscription?.manualAcks,
        );
      }),
    );
  }

  async subscribeToVolatileSubscriptions(
    subscriptions: ESVolatileSubscription[],
  ) {
    this.volatileSubscriptionsCount = subscriptions.length;
    this.volatileSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) =>
        this.subscribeToVolatileSubscription(
          this.getStreamId(subscription.stream),
          subscription.startAt,
          subscription.maxInflight,
          subscription?.ackWait,
          subscription?.manualAcks,
        ),
      ),
    );
  }

  async subscribeToVolatileSubscription(
    stream: string,
    startAt?: number,
    maxInFlight?: number,
    ackWait?: number,
    manualAcks?: boolean,
  ): Promise<ExtendedNatsVolatileSubscription> {
    this.logger.log(`Volatile and subscribing to stream ${stream}!`);
    const opts = this.eventStore.getClient().subscriptionOptions();

    if (ackWait) {
      opts.setAckWait(ackWait);
    }

    if (maxInFlight) {
      opts.setMaxInFlight(maxInFlight);
    }

    if (manualAcks) {
      opts.setManualAckMode(manualAcks);
    }

    if (startAt) {
      opts.setStartAtSequence(startAt);
    }

    if (this.configService.type === 'event-store') {
      throw new Error('Event store is not support');
    } else if (!this.configService.groupId) {
      throw new Error('Group ID is not defined');
    }

    const resolved = (await this.eventStore
      .getClient()
      .subscribe(
        stream,
        this.configService.groupId,
        opts,
      )) as ExtendedNatsVolatileSubscription;

    resolved.on('message', (msg) => this.onEvent(msg));
    resolved.on('error', (err) => this.onDropped(err));
    this.logger.log('Volatile processing of EventStore events started!');
    resolved.isLive = true;
    return resolved;
  }

  get allVolatileSubscriptionsLive(): boolean {
    const initialized =
      this.volatileSubscriptions.length === this.volatileSubscriptionsCount;
    return (
      initialized &&
      this.volatileSubscriptions.every((subscription) => {
        return !!subscription && subscription.isLive;
      })
    );
  }

  get allPersistentSubscriptionsLive(): boolean {
    const initialized =
      this.persistentSubscriptions.length === this.persistentSubscriptionsCount;
    return (
      initialized &&
      this.persistentSubscriptions.every((subscription) => {
        return !!subscription && subscription.isLive;
      })
    );
  }

  async subscribeToPersistentSubscription(
    stream: string,
    durableName: string,
    startAt?: number,
    maxInFlight?: number,
    ackWait?: number,
    manualAcks?: boolean,
  ): Promise<ExtendedNatsPersistentSubscription> {
    this.logger.log(`
      Connecting to persistent subscription ${durableName} on stream ${stream}!
    `);

    const opts = this.eventStore.getClient().subscriptionOptions();
    opts.setDurableName(durableName);

    if (ackWait) {
      opts.setAckWait(ackWait);
    }
    if (maxInFlight) {
      opts.setMaxInFlight(maxInFlight);
    }
    if (manualAcks) {
      opts.setManualAckMode(manualAcks);
    }

    if (startAt) {
      opts.setStartAtSequence(startAt);
    } else {
      opts.setStartWithLastReceived();
    }

    if (this.configService.type === 'event-store') {
      throw new Error('Event store is not support');
    } else if (!this.configService.groupId) {
      throw new Error('Group ID is not defined');
    }
    const resolved = (await this.eventStore
      .getClient()
      .subscribe(
        stream,
        this.configService.groupId,
        opts,
      )) as ExtendedNatsPersistentSubscription;
    resolved.isLive = true;
    resolved.on('message', (msg) => this.onEvent(msg));
    resolved.on('error', (err) => this.onDropped(err));

    return resolved;
  }

  async onEvent(payload: Message) {
    const data: any & { handlerType?: string } = JSON.parse(
      payload.getRawData().toString(),
    );
    const handlerType = data.handlerType;
    delete data.handlerType;
    const handler = this.eventHandlers[handlerType];
    if (!handler) {
      this.logger.error('Received event that could not be handled!');
      return;
    }

    const eventType = payload.getSubject();
    if (this.eventHandlers && this.eventHandlers[handlerType]) {
      this.subject$.next(this.eventHandlers[handlerType](...data));
    } else {
      Logger.warn(
        `Event of type ${eventType} not handled`,
        this.constructor.name,
      );
    }
  }

  onDropped(error: Error) {
    // subscription.isLive = false;
    this.logger.error('onDropped => ' + error.message);
  }

  get isLive(): boolean {
    /* return (
      this.allCatchUpSubscriptionsLive && this.allPersistentSubscriptionsLive && this.allVolatileSubscriptionsLive
    ); */
    return false;
  }

  addEventHandlers(eventHandlers: IEventConstructors) {
    this.eventHandlers = { ...this.eventHandlers, ...eventHandlers };
  }
  onModuleInit(): any {
    this.subject$ = (this.eventsBus as any).subject$;
    this.bridgeEventsTo((this.eventsBus as any).subject$);
    this.eventsBus.publisher = this;
  }

  onModuleDestroy(): any {
    this.eventStore.close();
  }

  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<any> {
    this.subject$ = subject as any;
  }
}
