import * as React from 'react';

import type { HTMLContent, JSONContent } from '@tiptap/react';

import type { BoardElement } from '@app/components/editors/page.editor/types';
import { TextEditor } from '@app/components/editors/text.editor';

export type Props = {
  element: BoardElement<string, { json: JSONContent; html: HTMLContent }>;
  isFocus?: boolean;
};

export const TextItem: React.FC<Props> = ({ element, isFocus }) => {
  return isFocus ? (
    <TextEditor editable value={element.props.json} />
  ) : (
    <div
      dangerouslySetInnerHTML={{
        __html: element.props.html,
      }}
    />
  );
};
