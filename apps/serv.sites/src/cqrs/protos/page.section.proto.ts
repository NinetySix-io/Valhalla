import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { Expose, Type } from 'class-transformer';

import { PageSection } from '@app/protobuf';
import { PageSectionFormatProto } from './page.section.format.proto';

export class PageSectionProto implements PageSection {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Type(() => PageSectionFormatProto)
  format?: PageSectionFormatProto;

  @Expose()
  @AsString()
  updatedBy: string;

  @Expose()
  @AsString()
  createdBy: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
