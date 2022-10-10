import { TextElement } from '@app/protobuf';

export class TextElementProto implements TextElement {
  html: string;
  json?: { [key: string]: unknown };
}
