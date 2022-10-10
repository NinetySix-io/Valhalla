import { Site, SiteStatus } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class SiteProto implements Site {
  @Expose({ name: '_id' })
  id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  status: SiteStatus;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
