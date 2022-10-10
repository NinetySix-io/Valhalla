import { EditStatus, Page } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class PageProto implements Page {
  @Expose({ name: '_id' })
  id: string;
  title: string;
  description?: string;
  site: string;
  status: EditStatus;
  isLoneTitle?: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string;
}
