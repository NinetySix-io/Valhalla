import { Expose } from 'class-transformer';
import { PageElementArea } from '@app/protobuf';

export class PageElementAreaProto implements PageElementArea {
  @Expose()
  x: number;

  @Expose()
  y: number;

  @Expose()
  height: number;

  @Expose()
  width: number;

  @Expose()
  isVisible: boolean;
}
