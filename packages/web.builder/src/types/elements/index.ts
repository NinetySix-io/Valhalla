import type { IBase } from './base';
import type { IText } from './text';

export type BuilderElement = {
  Text: IText;
  Container: IBase<'box', object>;
};
