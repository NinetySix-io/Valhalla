import { Expose } from 'class-transformer';
import { TextElement } from '@app/protobuf';

export class TextElementProto implements TextElement {
  @Expose()
  html: string;

  @Expose()
  json?: { [key: string]: unknown };
}
