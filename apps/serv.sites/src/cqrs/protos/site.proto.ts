import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { Site, SiteStatus } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class SiteProto implements Site {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  name: string;

  @Expose()
  @AsString()
  createdBy: string;

  @Expose()
  @AsString()
  updatedBy: string;

  @Expose()
  status: SiteStatus;

  @Expose()
  url?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
