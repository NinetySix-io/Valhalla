import { ContextType, ExecutionContext, Logger } from '@nestjs/common';

import dayjs from 'dayjs';
import { makeTag } from '@valhalla/utilities';

export class Telemetry {
  private readonly logger = new Logger(Telemetry.name);
  readonly context!: ExecutionContext;
  readonly traceId!: string;
  readonly callPoint?: string;
  readonly isParent!: boolean;
  private startTime!: Date;
  private endTime?: Date;
  private type!: ContextType | 'graphql';

  constructor(
    props: Pick<Telemetry, 'context' | 'traceId' | 'callPoint' | 'isParent'>,
  ) {
    this.context = props.context;
    this.traceId = props.traceId;
    this.callPoint = props.callPoint;
    this.isParent = props.isParent;
    this.type = props.context.getType();
    this.startTime = new Date();
  }

  private get durationTag() {
    return makeTag(
      'Duration',
      this.endTime ? dayjs(this.endTime).diff(this.startTime) + 'ms' : '???',
    );
  }

  private get callPointTag() {
    return makeTag(this.type.toUpperCase(), this.callPoint);
  }

  private get traceIdTag() {
    return makeTag('Trace', this.traceId);
  }

  private get relationshipTag() {
    return this.isParent ? makeTag('PARENT') : makeTag('CHILD');
  }

  private get headline() {
    return [
      this.relationshipTag,
      this.callPointTag,
      this.durationTag,
      this.traceIdTag,
    ].join(' ');
  }

  finish() {
    this.endTime = new Date();
    this.logger.debug(this.headline);
  }

  error(error: Error) {
    this.endTime = new Date();
    this.logger.error(this.headline, error);
  }
}
