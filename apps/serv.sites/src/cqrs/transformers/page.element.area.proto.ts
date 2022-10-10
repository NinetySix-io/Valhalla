import { PageElementArea } from '@app/protobuf';

export class PageElementAreaProto implements PageElementArea {
  x: number;
  y: number;
  height: number;
  width: number;
  isVisible: boolean;
}
