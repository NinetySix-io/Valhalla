import { Expose, Type } from 'class-transformer';

import { PageSection } from '@app/protobuf';
import { PageSectionFormatProto } from './page.section.format.proto';

export class PageSectionProto implements PageSection {
  @Expose({ name: '_id' })
  id: string;

  @Type(() => PageSectionFormatProto)
  format?: PageSectionFormatProto;

  updatedBy: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
