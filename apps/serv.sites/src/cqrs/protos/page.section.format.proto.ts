import { Expose } from 'class-transformer';
import { SectionFormat } from '@app/protobuf';

export class PageSectionFormatProto implements SectionFormat {
  @Expose()
  rowsCount: number;

  @Expose()
  rowGap: number;

  @Expose()
  columnGap: number;
}
