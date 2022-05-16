/* eslint-disable @typescript-eslint/no-explicit-any */
import * as uuid from 'uuid';

import {
  ConnectionSettings,
  EventStoreNodeConnection,
  TcpEndPoint,
  createConnection,
} from 'node-eventstore-client';

import { BrokerTypes } from '../contract';
import { Logger } from '@nestjs/common';
import assert from 'assert';

/**
 * @description Event store setup from eventstore.org
 */
export class EventStoreBroker {
  private logger: Logger = new Logger(this.constructor.name);
  private client: EventStoreNodeConnection;
  public isConnected: boolean;
  type: BrokerTypes;

  constructor() {
    this.type = 'event-store';
  }

  async connect(options: ConnectionSettings, endpoint: TcpEndPoint) {
    try {
      this.client = createConnection(options, endpoint);
      await this.client.connect();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.client.on('connected', () => {
        this.isConnected = true;
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.client.on('closed', () => {
        this.isConnected = false;
        this.logger.error('EventStore closed!');
        this.connect(options, endpoint);
      });

      return this;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  getClient(): EventStoreNodeConnection {
    return this.client;
  }

  newEvent(name: string, payload: any) {
    return this.newEventBuilder(name, payload);
  }

  private newEventBuilder(
    eventType: string,
    data: any,
    metadata?: any,
    eventId?: string,
  ) {
    assert(eventType);
    assert(data);

    const event: {
      eventId: string | any;
      eventType?: string | any;
      data?: any;
      metadata?: any;
    } = {
      eventId: eventId || uuid.v4(),
      eventType,
      data,
    };

    if (metadata !== undefined) {
      event.metadata = metadata;
    }
    return event;
  }

  /**
   * Close event store client
   */
  close() {
    this.client.close();
    return this;
  }
}
