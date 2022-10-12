import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { EditStatus, Page } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class PageProto implements Page {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  site: string;

  @Expose()
  status: EditStatus;

  @Expose()
  isLoneTitle?: boolean;

  @Expose()
  @AsString()
  createdBy: string;

  @Expose()
  @AsString()
  updatedBy: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  slug?: string;
}
