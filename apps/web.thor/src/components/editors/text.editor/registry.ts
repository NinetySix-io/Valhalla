import * as React from 'react';

import { Editor } from '@tiptap/react';

type Mode = 'one' | 'many';

type Option = {
  display: React.ReactNode;
};

export class OptionsRegistry {
  private mode: Mode;
  private registered: Option[] = [];

  constructor(editor: Editor, mode: Mode) {
    this.mode = mode;
  }

  register(option: Option) {
    this.registered.push(option);
  }

  actives() {}
}
