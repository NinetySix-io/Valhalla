import { SectionFormat } from '@app/protobuf';

export class PageSectionFormatProto implements SectionFormat {
  rowsCount: number;
  rowGap: number;
  columnGap: number;
}
