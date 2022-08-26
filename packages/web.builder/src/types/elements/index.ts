import { IBase } from './base';
import { IText } from './text';

export type BuilderElement = {
  Text: IText;
  Container: IBase<'box', object>;
};
